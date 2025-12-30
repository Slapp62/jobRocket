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
 * JOB 2: Clean up old applications
 * Runs daily at 3 AM
 *
 * Deletes applications where the listing expired 2+ years ago
 * (This handles the legal retention requirement)
 */
async function cleanupOldApplications() {
  logger.info('Starting old applications cleanup (2-year retention)');

  try {
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    // Find listings that expired 2+ years ago
    const oldExpiredListings = await Listings.find({
      expiresAt: { $exists: true, $lt: twoYearsAgo },
    }).select('_id');

    if (oldExpiredListings.length === 0) {
      logger.info('No listings with 2+ year old expirations found');
      return;
    }

    const listingIds = oldExpiredListings.map((l) => l._id);

    // Find applications for these very old listings
    const applicationsToDelete = await Applications.find({
      listingId: { $in: listingIds },
    });

    logger.info(
      `Found ${applicationsToDelete.length} applications past 2-year retention`
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
    const result = await Applications.deleteMany({
      listingId: { $in: listingIds },
    });

    logger.info('Old applications cleanup complete', {
      applicationsDeleted: result.deletedCount,
      resumesDeleted: resumesDeletedCount,
      oldListingsCount: oldExpiredListings.length,
    });
  } catch (error) {
    logger.error('Old applications cleanup job failed', {
      error: error.message,
      stack: error.stack,
    });
  }
}

/**
 * Schedule both cleanup jobs
 * Call this once when server starts
 */
function scheduleApplicationCleanup() {
  // Job 2: Old applications cleanup - runs at 3 AM daily
  cron.schedule('0 3 * * *', cleanupOldApplications);
  logger.info('Scheduled: Old applications cleanup (daily at 3 AM)');
}

module.exports = {
  scheduleApplicationCleanup,
  cleanupOldApplications,
};
