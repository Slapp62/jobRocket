// backend/jobs/scheduledCleanup.js
const cron = require('node-cron');
const Applications = require('../models/Applications');
const Listings = require('../models/Listings');
const cloudinary = require('cloudinary').v2;
const logger = require('../config/logger');

/**
 * Extract Cloudinary public ID from resume URL
 * Example URL: https://res.cloudinary.com/.../upload/v123/resumes/abc123.pdf
 * Returns: resumes/abc123
 */
function extractPublicIdFromUrl(url) {
  const match = url.match(/\/resumes\/([^.]+)/);
  return match ? `resumes/${match[1]}` : null;
}

/**
 * Delete resume from Cloudinary
 * Logs errors but doesn't throw (resume deletion shouldn't block database cleanup)
 */
async function deleteResumeFromCloudinary(resumeUrl, applicationId) {
  try {
    const publicId = extractPublicIdFromUrl(resumeUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
      return true;
    }
    return false;
  } catch (err) {
    logger.error('Failed to delete resume from Cloudinary', {
      applicationId,
      resumeUrl,
      error: err.message,
    });
    return false;
  }
}

/**
 * JOB 1: Clean up expired listings
 * Runs daily at 2 AM
 *
 * Deletes listings that are:
 * - Past their expiresAt date, OR
 * - Have no expiresAt and are 30+ days old
 *
 * Also cascades deletion to:
 * - All applications for deleted listings
 * - All resumes for those applications (from Cloudinary)
 */
async function cleanupExpiredListings() {
  logger.info('Starting expired listings cleanup');

  try {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Find listings to delete
    const listingsToDelete = await Listings.find({
      $or: [
        // Has expiration date and it's passed
        { expiresAt: { $exists: true, $lt: now } },
        // No expiration date and older than 30 days
        {
          expiresAt: { $exists: false },
          createdAt: { $lt: thirtyDaysAgo },
        },
      ],
    }).select('_id companyName jobTitle expiresAt createdAt');

    if (listingsToDelete.length === 0) {
      logger.info('No expired listings found');
      return;
    }

    const listingIds = listingsToDelete.map((l) => l._id);

    logger.info(`Found ${listingsToDelete.length} expired listings to delete`, {
      listingIds: listingIds.map((id) => id.toString()),
    });

    // Find all applications for these listings (need resume URLs)
    const applicationsToDelete = await Applications.find({
      listingId: { $in: listingIds },
    });

    logger.info(
      `Found ${applicationsToDelete.length} applications to delete with listings`
    );

    // Delete resumes from Cloudinary
    let resumesDeletedCount = 0;
    for (const app of applicationsToDelete) {
      if (app.resumeUrl) {
        const deleted = await deleteResumeFromCloudinary(
          app.resumeUrl,
          app._id
        );
        if (deleted) resumesDeletedCount++;
      }
    }

    // Delete applications from database
    const appsResult = await Applications.deleteMany({
      listingId: { $in: listingIds },
    });

    // Delete listings from database
    const listingsResult = await Listings.deleteMany({
      _id: { $in: listingIds },
    });

    logger.info('Expired listings cleanup complete', {
      listingsDeleted: listingsResult.deletedCount,
      applicationsDeleted: appsResult.deletedCount,
      resumesDeleted: resumesDeletedCount,
    });
  } catch (error) {
    logger.error('Expired listings cleanup job failed', {
      error: error.message,
      stack: error.stack,
    });
  }
}

function scheduleListingCleanup() {
  cron.schedule('0 2 * * *', cleanupExpiredListings);
  logger.info('Scheduled: Expired listings cleanup (daily at 2 AM)');
}

module.exports = {
  scheduleListingCleanup,
  cleanupExpiredListings,
};
