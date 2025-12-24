// backend/cronJobs/userDeletion.js
const cron = require('node-cron');
const Users = require('../models/Users');
const Applications = require('../models/Applications');
const cloudinary = require('cloudinary').v2;
const logger = require('../config/logger');

/**
 * Extract Cloudinary public ID from resume URL
 */
function extractPublicIdFromUrl(url) {
  const match = url.match(/\/resumes\/([^.]+)/);
  return match ? `resumes/${match[1]}` : null;
}

/**
 * Delete resume from Cloudinary
 */
async function deleteResumeFromCloudinary(resumeUrl) {
  try {
    const publicId = extractPublicIdFromUrl(resumeUrl);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
      return true;
    }
    return false;
  } catch (err) {
    logger.error('Failed to delete resume from Cloudinary', {
      resumeUrl,
      error: err.message,
    });
    return false;
  }
}

/**
 * Permanently delete users who have been soft-deleted for 30+ days
 * Runs daily at 4 AM
 *
 * Deletes:
 * - User account
 * - Pending applications (reviewed/rejected applications are kept for employer records)
 * - AI embeddings (part of user profile)
 * - Resume files from Cloudinary (for pending applications only)
 *
 * Keeps:
 * - Consent records (audit trail - required by law)
 * - Reviewed/rejected applications (employer records)
 */
async function permanentlyDeleteUsers() {
  logger.info('Starting permanent user deletion (30-day grace period expired)');

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Find users soft-deleted 30+ days ago
    const usersToDelete = await Users.find({
      isDeleted: true,
      deletedAt: { $exists: true, $lt: thirtyDaysAgo },
    }).select('_id email profileType deletedAt');

    if (usersToDelete.length === 0) {
      logger.info('No users past 30-day grace period found');
      return;
    }

    logger.info(`Found ${usersToDelete.length} users to permanently delete`, {
      userIds: usersToDelete.map(u => u._id.toString()),
    });

    for (const user of usersToDelete) {
      try {
        // Delete pending applications and their resumes
        const pendingApplications = await Applications.find({
          applicantId: user._id,
          status: 'pending',
        });

        let resumesDeleted = 0;
        for (const app of pendingApplications) {
          if (app.resumeUrl) {
            const deleted = await deleteResumeFromCloudinary(app.resumeUrl);
            if (deleted) resumesDeleted++;
          }
        }

        // Delete pending applications from database
        const appsResult = await Applications.deleteMany({
          applicantId: user._id,
          status: 'pending',
        });

        // Permanently delete user (embeddings deleted automatically as part of profile)
        await Users.findByIdAndDelete(user._id);

        logger.info('User permanently deleted', {
          userId: user._id.toString(),
          email: user.email,
          profileType: user.profileType,
          deletedAt: user.deletedAt,
          pendingApplicationsDeleted: appsResult.deletedCount,
          resumesDeleted,
        });
      } catch (err) {
        logger.error('Failed to permanently delete user', {
          userId: user._id.toString(),
          error: err.message,
          stack: err.stack,
        });
      }
    }

    logger.info('Permanent user deletion complete', {
      usersProcessed: usersToDelete.length,
    });

  } catch (error) {
    logger.error('Permanent user deletion job failed', {
      error: error.message,
      stack: error.stack,
    });
  }
}

/**
 * Schedule permanent user deletion job
 * Call this once when server starts
 */
function scheduleUserDeletion() {
  // Runs at 4 AM daily
  cron.schedule('0 4 * * *', permanentlyDeleteUsers);
  logger.info('Scheduled: Permanent user deletion (daily at 4 AM)');
}

module.exports = {
  scheduleUserDeletion,
  permanentlyDeleteUsers,
};
