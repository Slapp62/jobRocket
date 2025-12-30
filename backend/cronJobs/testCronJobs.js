// backend/cronJobs/testCronJobs.js
/**
 * Manual test script for all cron jobs
 *
 * This script allows you to manually trigger all three cron jobs without waiting
 * for their scheduled times. It also seeds test data to ensure there's something
 * for the cron jobs to clean up.
 *
 * Usage: node cronJobs/testCronJobs.js
 *
 * IMPORTANT: This will create and delete test data in your database.
 * Only run this in development or test environments!
 */

require('dotenv').config();
const mongoose = require('mongoose');
const { cleanupExpiredListings } = require('./listingDeletion');
const { permanentlyDeleteUsers } = require('./userDeletion');
const Users = require('../models/Users');
const Listings = require('../models/Listings');
const Applications = require('../models/Applications');
const logger = require('../config/logger');

// Choose which database to use based on NODE_ENV
const getMongoUri = () => {
  if (process.env.NODE_ENV === 'test') {
    return 'mongodb://localhost:27017/jobRocket-test';
  }
  if (process.env.NODE_ENV === 'production') {
    return process.env.MONGO_ATLAS_URI;
  }
  // Development - use MONGO_ATLAS_URI from .env or local fallback
  return process.env.MONGO_ATLAS_URI || 'mongodb://localhost:27017/jobRocket';
};

/**
 * Seed test data for cron jobs to clean up
 */
async function seedTestData() {
  console.log('\n=== Seeding Test Data ===\n');

  try {
    // 1. Create a test user that's been soft-deleted for 31 days
    const softDeletedUser = await Users.create({
      email: 'deleted-user-test@example.com',
      password: '$2a$10$hashedpassword', // Dummy hash
      profileType: 'jobseeker',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000), // 31 days ago
      jobseekerProfile: {
        firstName: 'Deleted',
        lastName: 'User',
        highestEducation: 'High School',
        preferredWorkArrangement: 'Hybrid',
      },
      consents: {
        ageConfirmation: {
          granted: true,
          timestamp: new Date(),
        },
        dataProcessing: {
          granted: true,
          timestamp: new Date(),
        },
      },
    });
    console.log(`✓ Created soft-deleted user (${softDeletedUser._id})`);

    // 2. Create a listing that expired 8 days ago (past 7-day grace period)
    const expiredListing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Expired Job',
      jobDescription: 'This job listing should be deleted (expired 8 days ago)',
      businessId: softDeletedUser._id,
      location: {
        region: 'Center',
        city: 'Tel Aviv',
      },
      workArrangement: 'Full-time On-site',
      apply: {
        method: {
          jobRocketSystem: true,
          companySystem: false,
          email: false,
        },
        contact: {
          email: '',
          link: '',
        },
      },
      expiresAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago (past grace period)
      createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000), // 40 days ago
    });
    console.log(`✓ Created expired listing past grace period (${expiredListing._id})`);

    // 3. Create a listing in grace period (expired 3 days ago - should NOT be deleted)
    const gracePeriodListing = await Listings.create({
      companyName: 'Grace Company',
      jobTitle: 'Job in Grace Period',
      jobDescription: 'This listing expired 3 days ago and is still in grace period',
      businessId: softDeletedUser._id,
      location: {
        region: 'Center',
        city: 'Haifa',
      },
      workArrangement: 'Full-time Remote',
      apply: {
        method: {
          jobRocketSystem: true,
          companySystem: false,
          email: false,
        },
        contact: {
          email: '',
          link: '',
        },
      },
      expiresAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago (in grace period)
      createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 35 days ago
    });
    console.log(`✓ Created listing in grace period (${gracePeriodListing._id})`);

    // 4. Create an active listing (not expired - should NOT be deleted)
    const activeListing = await Listings.create({
      companyName: 'Active Company',
      jobTitle: 'Active Job',
      jobDescription: 'This job is still active and should not be deleted',
      businessId: softDeletedUser._id,
      location: {
        region: 'South',
        city: 'Beer Sheva',
      },
      workArrangement: 'Full-time Hybrid',
      apply: {
        method: {
          jobRocketSystem: true,
          companySystem: false,
          email: false,
        },
        contact: {
          email: '',
          link: '',
        },
      },
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    });
    console.log(`✓ Created active listing (${activeListing._id})`);

    // 5. Create applications for these listings
    const consentData = {
      sharedFields: {
        name: true,
        email: true,
        phone: true,
        resume: true,
      },
      consentGranted: true,
      consentTimestamp: new Date(),
      ipAddress: '127.0.0.1',
      userAgent: 'Test Agent',
      employerName: 'Test Company',
    };

    const app1 = await Applications.create({
      listingId: expiredListing._id,
      applicantId: softDeletedUser._id,
      firstName: 'Test',
      lastName: 'Applicant',
      email: 'applicant1@test.com',
      phoneNumber: '555-0001',
      status: 'pending',
      resumeUrl: 'https://res.cloudinary.com/test/upload/v123/resumes/test-resume-0.pdf',
      applicationDataConsent: consentData,
    });
    console.log(`✓ Created application for expired listing (should be deleted) (${app1._id})`);

    const app2 = await Applications.create({
      listingId: gracePeriodListing._id,
      applicantId: softDeletedUser._id,
      firstName: 'Test',
      lastName: 'Applicant2',
      email: 'applicant2@test.com',
      phoneNumber: '555-0002',
      status: 'pending',
      resumeUrl: 'https://res.cloudinary.com/test/upload/v123/resumes/test-resume-1.pdf',
      applicationDataConsent: consentData,
    });
    console.log(`✓ Created application for grace period listing (should NOT be deleted) (${app2._id})`);

    const app3 = await Applications.create({
      listingId: activeListing._id,
      applicantId: softDeletedUser._id,
      firstName: 'Test',
      lastName: 'Applicant3',
      email: 'applicant3@test.com',
      phoneNumber: '555-0003',
      status: 'pending',
      resumeUrl: 'https://res.cloudinary.com/test/upload/v123/resumes/test-resume-2.pdf',
      applicationDataConsent: consentData,
    });
    console.log(`✓ Created application for active listing (should NOT be deleted) (${app3._id})`);

    // 6. Create a pending application for the soft-deleted user
    const anotherListing = await Listings.create({
      companyName: 'Active Company',
      jobTitle: 'Active Job',
      jobDescription: 'This job is still active',
      businessId: softDeletedUser._id,
      location: {
        region: 'North',
        city: 'Acre (Akko)',
      },
      workArrangement: 'Part-time On-site',
      apply: {
        method: {
          jobRocketSystem: true,
          companySystem: false,
          email: false,
        },
        contact: {
          email: '',
          link: '',
        },
      },
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expires in 30 days
    });

    const pendingApp = await Applications.create({
      listingId: anotherListing._id,
      applicantId: softDeletedUser._id,
      firstName: 'Deleted',
      lastName: 'User',
      email: 'deleted-user-test@example.com',
      phoneNumber: '555-0004',
      status: 'pending',
      resumeUrl: 'https://res.cloudinary.com/test/upload/v123/resumes/deleted-user-resume.pdf',
      applicationDataConsent: consentData,
    });
    console.log(`✓ Created pending application for soft-deleted user (${pendingApp._id})`);

    console.log('\n✅ Test data seeded successfully!\n');
  } catch (error) {
    console.error('❌ Failed to seed test data:', error.message);
    throw error;
  }
}

/**
 * Clean up test data (optional - the cron jobs should clean most of it)
 */
async function cleanupTestData() {
  console.log('\n=== Cleaning Up Remaining Test Data ===\n');

  try {
    // Delete any remaining test users
    const usersDeleted = await Users.deleteMany({
      email: { $regex: /test@example\.com$|deleted-user-test@example\.com$/ },
    });
    console.log(`✓ Deleted ${usersDeleted.deletedCount} test users`);

    // Delete any remaining test listings
    const listingsDeleted = await Listings.deleteMany({
      companyName: { $regex: /Test Company|Grace Company|Active Company/ },
    });
    console.log(`✓ Deleted ${listingsDeleted.deletedCount} test listings`);

    // Delete any remaining test applications
    const appsDeleted = await Applications.deleteMany({
      email: { $regex: /applicant\d+@test\.com|deleted-user-test@example\.com/ },
    });
    console.log(`✓ Deleted ${appsDeleted.deletedCount} test applications`);

    console.log('\n✅ Test data cleanup complete!\n');
  } catch (error) {
    console.error('❌ Failed to clean up test data:', error.message);
  }
}

/**
 * Main test function
 */
async function runCronJobTests() {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║       CRON JOBS MANUAL TEST SCRIPT            ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  try {
    // Connect to database
    console.log('Connecting to MongoDB...');
    const mongoUri = getMongoUri();
    await mongoose.connect(mongoUri);
    console.log(`✓ Connected to database: ${mongoUri}\n`);

    // Clean up any existing test data first
    await cleanupTestData();

    // Seed test data
    await seedTestData();

    // Give a moment for database to sync
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Test 1: Listing Cleanup (should delete listings expired 7+ days ago + their applications)
    // Should delete: expiredListing (expired 8 days ago) + app1
    // Should NOT delete: gracePeriodListing (expired 3 days ago) + app2, activeListing + app3
    console.log('═══════════════════════════════════════════════');
    console.log('TEST 1: Expired Listings Cleanup (2 AM job)');
    console.log('Expects: 1 listing deleted (expired 8 days ago)');
    console.log('         1 application deleted (for expired listing)');
    console.log('         Grace period and active listings preserved');
    console.log('═══════════════════════════════════════════════\n');
    await cleanupExpiredListings();

    // Wait a moment
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Test 2: User Deletion (should delete soft-deleted users 30+ days old + pending apps)
    console.log('\n═══════════════════════════════════════════════');
    console.log('TEST 2: Permanent User Deletion (3 AM job)');
    console.log('Expects: 1 user deleted (soft-deleted 31 days ago)');
    console.log('         1 pending application withdrawn');
    console.log('═══════════════════════════════════════════════\n');
    await permanentlyDeleteUsers();

    // Wait a moment
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Clean up any remaining test data
    await cleanupTestData();

    console.log('\n╔════════════════════════════════════════════════╗');
    console.log('║         ✅ ALL CRON JOBS TESTED!               ║');
    console.log('╚════════════════════════════════════════════════╝\n');

    console.log('Check the logs above to verify:');
    console.log('  1. Listings expired 7+ days were deleted (with their applications)');
    console.log('  2. Listings in grace period (0-7 days expired) were preserved');
    console.log('  3. Active listings were preserved');
    console.log('  4. Soft-deleted users (30+ days) were permanently deleted');
    console.log('  5. Cloudinary resume deletions were attempted (may fail in test)');
    console.log('\nNOTE: Cloudinary errors are expected if not configured.\n');
  } catch (error) {
    console.error('\n❌ Test script failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('✓ Database connection closed\n');
  }
}

// Run if executed directly
if (require.main === module) {
  runCronJobTests()
    .then(() => {
      console.log('Exiting...\n');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Fatal error:', err);
      process.exit(1);
    });
}

module.exports = { runCronJobTests, seedTestData, cleanupTestData };
