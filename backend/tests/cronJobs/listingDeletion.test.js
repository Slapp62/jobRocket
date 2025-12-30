// backend/tests/cronJobs/listingDeletion.test.js
const { cleanupExpiredListings } = require('../../cronJobs/listingDeletion');
const Users = require('../../models/Users');
const Listings = require('../../models/Listings');
const Applications = require('../../models/Applications');
const cloudinary = require('cloudinary').v2;

// Mock Cloudinary to prevent actual API calls during tests
jest.mock('cloudinary', () => ({
  v2: {
    uploader: {
      destroy: jest.fn().mockResolvedValue({ result: 'ok' }),
    },
  },
}));

describe('Listing Deletion Cron Job', () => {
  let testUser;

  beforeEach(async () => {
    // Clear collections before each test
    await Users.deleteMany({});
    await Listings.deleteMany({});
    await Applications.deleteMany({});

    // Create a test user for listings
    testUser = await Users.create({
      email: 'crontest@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'business',
      firstName: 'Cron',
      lastName: 'Test',
    });

    // Clear mock calls
    jest.clearAllMocks();
  });

  test('should delete listings with expired expiresAt date', async () => {
    // Create an expired listing (expired yesterday)
    const expiredListing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Expired Job',
      description: 'This should be deleted',
      location: 'Test City',
      salary: '$50,000',
      userId: testUser._id,
      expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    });

    // Create a non-expired listing (expires in 10 days)
    await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Active Job',
      description: 'This should remain',
      location: 'Test City',
      salary: '$60,000',
      userId: testUser._id,
      expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    });

    // Run the cron job
    await cleanupExpiredListings();

    // Verify expired listing was deleted
    const expiredExists = await Listings.findById(expiredListing._id);
    expect(expiredExists).toBeNull();

    // Verify active listing still exists
    const activeListing = await Listings.findOne({ jobTitle: 'Active Job' });
    expect(activeListing).toBeTruthy();
  });

  test('should delete listings older than 30 days without expiresAt', async () => {
    // Create an old listing without expiresAt (35 days old)
    const oldListing = await Listings.create({
      companyName: 'Old Company',
      jobTitle: 'Old Job',
      description: 'This should be deleted',
      location: 'Old City',
      salary: '$70,000',
      userId: testUser._id,
      createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 35 days ago
      // No expiresAt field
    });

    // Create a recent listing without expiresAt (20 days old)
    await Listings.create({
      companyName: 'Recent Company',
      jobTitle: 'Recent Job',
      description: 'This should remain',
      location: 'Recent City',
      salary: '$80,000',
      userId: testUser._id,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      // No expiresAt field
    });

    // Run the cron job
    await cleanupExpiredListings();

    // Verify old listing was deleted
    const oldExists = await Listings.findById(oldListing._id);
    expect(oldExists).toBeNull();

    // Verify recent listing still exists
    const recentListing = await Listings.findOne({ jobTitle: 'Recent Job' });
    expect(recentListing).toBeTruthy();
  });

  test('should cascade delete applications when deleting listings', async () => {
    // Create an expired listing
    const expiredListing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Expired Job',
      description: 'This should be deleted',
      location: 'Test City',
      salary: '$50,000',
      userId: testUser._id,
      expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    });

    // Create applications for this listing
    const app1 = await Applications.create({
      listingId: expiredListing._id,
      applicantId: testUser._id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '555-0001',
      status: 'pending',
    });

    const app2 = await Applications.create({
      listingId: expiredListing._id,
      applicantId: testUser._id,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phoneNumber: '555-0002',
      status: 'reviewed',
    });

    // Run the cron job
    await cleanupExpiredListings();

    // Verify applications were deleted
    const app1Exists = await Applications.findById(app1._id);
    const app2Exists = await Applications.findById(app2._id);
    expect(app1Exists).toBeNull();
    expect(app2Exists).toBeNull();
  });

  test('should attempt to delete resumes from Cloudinary', async () => {
    // Create an expired listing
    const expiredListing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Expired Job',
      description: 'This should be deleted',
      location: 'Test City',
      salary: '$50,000',
      userId: testUser._id,
      expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    });

    // Create application with resume URL
    await Applications.create({
      listingId: expiredListing._id,
      applicantId: testUser._id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '555-0001',
      status: 'pending',
      resumeUrl:
        'https://res.cloudinary.com/test/upload/v123/resumes/test-resume.pdf',
    });

    // Run the cron job
    await cleanupExpiredListings();

    // Verify Cloudinary delete was called
    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith(
      'resumes/test-resume',
      { resource_type: 'raw' }
    );
  });

  test('should handle applications without resumes gracefully', async () => {
    // Create an expired listing
    const expiredListing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Expired Job',
      description: 'This should be deleted',
      location: 'Test City',
      salary: '$50,000',
      userId: testUser._id,
      expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    });

    // Create application WITHOUT resume URL
    await Applications.create({
      listingId: expiredListing._id,
      applicantId: testUser._id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '555-0001',
      status: 'pending',
      // No resumeUrl
    });

    // Run the cron job - should not throw error
    await expect(cleanupExpiredListings()).resolves.not.toThrow();

    // Verify Cloudinary delete was NOT called
    expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();
  });

  test('should continue even if Cloudinary deletion fails', async () => {
    // Mock Cloudinary to throw an error
    cloudinary.uploader.destroy.mockRejectedValueOnce(
      new Error('Cloudinary error')
    );

    // Create an expired listing
    const expiredListing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Expired Job',
      description: 'This should be deleted',
      location: 'Test City',
      salary: '$50,000',
      userId: testUser._id,
      expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    });

    // Create application with resume
    await Applications.create({
      listingId: expiredListing._id,
      applicantId: testUser._id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '555-0001',
      status: 'pending',
      resumeUrl:
        'https://res.cloudinary.com/test/upload/v123/resumes/test-resume.pdf',
    });

    // Run the cron job - should not throw
    await expect(cleanupExpiredListings()).resolves.not.toThrow();

    // Verify listing and application were still deleted despite Cloudinary failure
    const listingExists = await Listings.findById(expiredListing._id);
    expect(listingExists).toBeNull();

    const appExists = await Applications.findOne({
      listingId: expiredListing._id,
    });
    expect(appExists).toBeNull();
  });

  test('should do nothing if no expired listings exist', async () => {
    // Create only active listings
    await Listings.create({
      companyName: 'Active Company',
      jobTitle: 'Active Job',
      description: 'This should remain',
      location: 'Test City',
      salary: '$60,000',
      userId: testUser._id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });

    // Get initial count
    const initialCount = await Listings.countDocuments();

    // Run the cron job
    await cleanupExpiredListings();

    // Verify no listings were deleted
    const finalCount = await Listings.countDocuments();
    expect(finalCount).toBe(initialCount);
  });

  test('should handle multiple expired listings in one run', async () => {
    // Create multiple expired listings
    const listing1 = await Listings.create({
      companyName: 'Company 1',
      jobTitle: 'Job 1',
      description: 'Expired job 1',
      location: 'City 1',
      salary: '$50,000',
      userId: testUser._id,
      expiresAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    });

    const listing2 = await Listings.create({
      companyName: 'Company 2',
      jobTitle: 'Job 2',
      description: 'Expired job 2',
      location: 'City 2',
      salary: '$60,000',
      userId: testUser._id,
      expiresAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    });

    const listing3 = await Listings.create({
      companyName: 'Company 3',
      jobTitle: 'Job 3',
      description: 'Old job no expiry',
      location: 'City 3',
      salary: '$70,000',
      userId: testUser._id,
      createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000), // 40 days ago
    });

    // Run the cron job
    await cleanupExpiredListings();

    // Verify all expired listings were deleted
    const l1 = await Listings.findById(listing1._id);
    const l2 = await Listings.findById(listing2._id);
    const l3 = await Listings.findById(listing3._id);

    expect(l1).toBeNull();
    expect(l2).toBeNull();
    expect(l3).toBeNull();
  });
});
