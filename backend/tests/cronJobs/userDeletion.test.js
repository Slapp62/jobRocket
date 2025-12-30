// backend/tests/cronJobs/userDeletion.test.js
const { permanentlyDeleteUsers } = require('../../cronJobs/userDeletion');
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

describe('User Deletion Cron Job', () => {
  let businessUser;

  beforeEach(async () => {
    // Clear collections before each test
    await Users.deleteMany({});
    await Listings.deleteMany({});
    await Applications.deleteMany({});

    // Create a business user for listings
    businessUser = await Users.create({
      email: 'business@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'business',
      firstName: 'Business',
      lastName: 'Owner',
    });

    // Clear mock calls
    jest.clearAllMocks();
  });

  test('should permanently delete users soft-deleted 30+ days ago', async () => {
    // Create a user soft-deleted 31 days ago
    const deletedUser = await Users.create({
      email: 'deleted@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Deleted',
      lastName: 'User',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000), // 31 days ago
    });

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify user was permanently deleted
    const userExists = await Users.findById(deletedUser._id);
    expect(userExists).toBeNull();
  });

  test('should NOT delete users soft-deleted less than 30 days ago', async () => {
    // Create a user soft-deleted 20 days ago
    const recentlyDeletedUser = await Users.create({
      email: 'recent-deleted@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Recent',
      lastName: 'Deleted',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    });

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify user still exists (not permanently deleted yet)
    const userExists = await Users.findById(recentlyDeletedUser._id);
    expect(userExists).toBeTruthy();
  });

  test('should NOT delete active users (not soft-deleted)', async () => {
    // Create an active user (not soft-deleted)
    const activeUser = await Users.create({
      email: 'active@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Active',
      lastName: 'User',
      isDeleted: false,
    });

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify active user still exists
    const userExists = await Users.findById(activeUser._id);
    expect(userExists).toBeTruthy();
  });

  test('should delete pending applications when deleting user', async () => {
    // Create a soft-deleted user
    const deletedUser = await Users.create({
      email: 'deleted@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Deleted',
      lastName: 'User',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000), // 31 days ago
    });

    // Create a listing
    const listing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Test Job',
      description: 'Test description',
      location: 'Test City',
      salary: '$50,000',
      userId: businessUser._id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Active listing
    });

    // Create a pending application by the deleted user
    const pendingApp = await Applications.create({
      listingId: listing._id,
      applicantId: deletedUser._id,
      firstName: 'Deleted',
      lastName: 'User',
      email: 'deleted@example.com',
      phoneNumber: '555-0001',
      status: 'pending',
    });

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify pending application was deleted
    const appExists = await Applications.findById(pendingApp._id);
    expect(appExists).toBeNull();
  });

  test('should NOT delete reviewed applications when deleting user', async () => {
    // Create a soft-deleted user
    const deletedUser = await Users.create({
      email: 'deleted@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Deleted',
      lastName: 'User',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000), // 31 days ago
    });

    // Create a listing
    const listing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Test Job',
      description: 'Test description',
      location: 'Test City',
      salary: '$50,000',
      userId: businessUser._id,
    });

    // Create a reviewed application by the deleted user
    const reviewedApp = await Applications.create({
      listingId: listing._id,
      applicantId: deletedUser._id,
      firstName: 'Deleted',
      lastName: 'User',
      email: 'deleted@example.com',
      phoneNumber: '555-0001',
      status: 'reviewed',
    });

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify reviewed application still exists (kept for employer records)
    const appExists = await Applications.findById(reviewedApp._id);
    expect(appExists).toBeTruthy();
  });

  test('should NOT delete rejected applications when deleting user', async () => {
    // Create a soft-deleted user
    const deletedUser = await Users.create({
      email: 'deleted@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Deleted',
      lastName: 'User',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000), // 31 days ago
    });

    // Create a listing
    const listing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Test Job',
      description: 'Test description',
      location: 'Test City',
      salary: '$50,000',
      userId: businessUser._id,
    });

    // Create a rejected application by the deleted user
    const rejectedApp = await Applications.create({
      listingId: listing._id,
      applicantId: deletedUser._id,
      firstName: 'Deleted',
      lastName: 'User',
      email: 'deleted@example.com',
      phoneNumber: '555-0001',
      status: 'rejected',
    });

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify rejected application still exists (kept for employer records)
    const appExists = await Applications.findById(rejectedApp._id);
    expect(appExists).toBeTruthy();
  });

  test('should attempt to delete resumes for pending applications', async () => {
    // Create a soft-deleted user
    const deletedUser = await Users.create({
      email: 'deleted@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Deleted',
      lastName: 'User',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000), // 31 days ago
    });

    // Create a listing
    const listing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Test Job',
      description: 'Test description',
      location: 'Test City',
      salary: '$50,000',
      userId: businessUser._id,
    });

    // Create pending application with resume
    await Applications.create({
      listingId: listing._id,
      applicantId: deletedUser._id,
      firstName: 'Deleted',
      lastName: 'User',
      email: 'deleted@example.com',
      phoneNumber: '555-0001',
      status: 'pending',
      resumeUrl:
        'https://res.cloudinary.com/test/upload/v123/resumes/user-resume.pdf',
    });

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify Cloudinary delete was called
    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith(
      'resumes/user-resume',
      { resource_type: 'raw' }
    );
  });

  test('should NOT attempt to delete resumes for reviewed applications', async () => {
    // Create a soft-deleted user
    const deletedUser = await Users.create({
      email: 'deleted@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Deleted',
      lastName: 'User',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000), // 31 days ago
    });

    // Create a listing
    const listing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Test Job',
      description: 'Test description',
      location: 'Test City',
      salary: '$50,000',
      userId: businessUser._id,
    });

    // Create reviewed application with resume (should be kept)
    await Applications.create({
      listingId: listing._id,
      applicantId: deletedUser._id,
      firstName: 'Deleted',
      lastName: 'User',
      email: 'deleted@example.com',
      phoneNumber: '555-0001',
      status: 'reviewed',
      resumeUrl:
        'https://res.cloudinary.com/test/upload/v123/resumes/reviewed-resume.pdf',
    });

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify Cloudinary delete was NOT called (reviewed app kept)
    expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();
  });

  test('should handle pending applications without resumes gracefully', async () => {
    // Create a soft-deleted user
    const deletedUser = await Users.create({
      email: 'deleted@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Deleted',
      lastName: 'User',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000), // 31 days ago
    });

    // Create a listing
    const listing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Test Job',
      description: 'Test description',
      location: 'Test City',
      salary: '$50,000',
      userId: businessUser._id,
    });

    // Create pending application WITHOUT resume
    await Applications.create({
      listingId: listing._id,
      applicantId: deletedUser._id,
      firstName: 'Deleted',
      lastName: 'User',
      email: 'deleted@example.com',
      phoneNumber: '555-0001',
      status: 'pending',
      // No resumeUrl
    });

    // Run the cron job - should not throw error
    await expect(permanentlyDeleteUsers()).resolves.not.toThrow();

    // Verify Cloudinary delete was NOT called
    expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();
  });

  test('should continue even if Cloudinary deletion fails', async () => {
    // Mock Cloudinary to throw an error
    cloudinary.uploader.destroy.mockRejectedValueOnce(
      new Error('Cloudinary error')
    );

    // Create a soft-deleted user
    const deletedUser = await Users.create({
      email: 'deleted@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Deleted',
      lastName: 'User',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000), // 31 days ago
    });

    // Create a listing
    const listing = await Listings.create({
      companyName: 'Test Company',
      jobTitle: 'Test Job',
      description: 'Test description',
      location: 'Test City',
      salary: '$50,000',
      userId: businessUser._id,
    });

    // Create pending application with resume
    await Applications.create({
      listingId: listing._id,
      applicantId: deletedUser._id,
      firstName: 'Deleted',
      lastName: 'User',
      email: 'deleted@example.com',
      phoneNumber: '555-0001',
      status: 'pending',
      resumeUrl:
        'https://res.cloudinary.com/test/upload/v123/resumes/user-resume.pdf',
    });

    // Run the cron job - should not throw
    await expect(permanentlyDeleteUsers()).resolves.not.toThrow();

    // Verify user was still deleted despite Cloudinary failure
    const userExists = await Users.findById(deletedUser._id);
    expect(userExists).toBeNull();
  });

  test('should do nothing if no users past grace period exist', async () => {
    // Create a recent soft-deleted user (10 days ago)
    await Users.create({
      email: 'recent@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Recent',
      lastName: 'User',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    });

    // Get initial user count
    const initialCount = await Users.countDocuments();

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify no users were deleted
    const finalCount = await Users.countDocuments();
    expect(finalCount).toBe(initialCount);
  });

  test('should handle multiple users in one run', async () => {
    // Create multiple soft-deleted users past grace period
    const user1 = await Users.create({
      email: 'deleted1@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Deleted',
      lastName: 'One',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 35 days ago
    });

    const user2 = await Users.create({
      email: 'deleted2@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Deleted',
      lastName: 'Two',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000), // 40 days ago
    });

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify both users were deleted
    const u1 = await Users.findById(user1._id);
    const u2 = await Users.findById(user2._id);

    expect(u1).toBeNull();
    expect(u2).toBeNull();
  });

  test('should handle users without deletedAt field', async () => {
    // Create a user marked as deleted but no deletedAt field
    const userNoDate = await Users.create({
      email: 'nodate@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'No',
      lastName: 'Date',
      isDeleted: true,
      // No deletedAt field
    });

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify user was NOT deleted (no deletedAt = not included in query)
    const userExists = await Users.findById(userNoDate._id);
    expect(userExists).toBeTruthy();
  });

  test('should verify 30-day grace period boundary', async () => {
    // Create a user soft-deleted exactly 30 days ago (boundary case)
    const thirtyDaysExactly = new Date();
    thirtyDaysExactly.setDate(thirtyDaysExactly.getDate() - 30);

    const boundaryUser = await Users.create({
      email: 'boundary@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'Boundary',
      lastName: 'User',
      isDeleted: true,
      deletedAt: thirtyDaysExactly,
    });

    // Run the cron job
    await permanentlyDeleteUsers();

    // Verify user was NOT deleted (boundary is exclusive, not inclusive)
    const userExists = await Users.findById(boundaryUser._id);
    expect(userExists).toBeTruthy();
  });

  test('should handle errors for individual users gracefully', async () => {
    // Create two soft-deleted users
    const user1 = await Users.create({
      email: 'deleted1@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'User',
      lastName: 'One',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    });

    const user2 = await Users.create({
      email: 'deleted2@example.com',
      password: '$2a$10$hashedpassword',
      profileType: 'jobseeker',
      firstName: 'User',
      lastName: 'Two',
      isDeleted: true,
      deletedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    });

    // Mock Applications.find to throw error for first user
    const originalFind = Applications.find;
    let callCount = 0;
    Applications.find = jest.fn().mockImplementation(function (query) {
      callCount++;
      if (callCount === 1) {
        throw new Error('Database error');
      }
      return originalFind.call(this, query);
    });

    // Run the cron job - should not throw
    await expect(permanentlyDeleteUsers()).resolves.not.toThrow();

    // Restore original function
    Applications.find = originalFind;

    // Verify second user was still processed despite first user error
    const user2Exists = await Users.findById(user2._id);
    expect(user2Exists).toBeNull();
  });
});
