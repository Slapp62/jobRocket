const request = require('supertest');
const app = require('../../app');
const {
  getRegularUserToken,
  getBusinessUserToken,
  getAuthHeader,
} = require('../helpers/authHelpers');
const Listings = require('../../models/Listings');
const Applications = require('../../models/Applications');
const Users = require('../../models/Users');

describe('GET /api/applications/my-applications - Get User Applications', () => {
  let regularUserToken;
  let businessUserToken;

  beforeEach(async () => {
    regularUserToken = await getRegularUserToken();
    businessUserToken = await getBusinessUserToken();
  });

  test('should return all applications for authenticated user', async () => {
    const regularUser = await Users.findOne({
      email: 'sarah.cohen@email.com',
    });
    const activeListing = await Listings.findOne({ isActive: true });

    // Create a test application
    await Applications.create({
      listingId: activeListing._id,
      applicantId: regularUser._id,
      resume:
        'Experienced software developer with 5 years of experience in full-stack development.',
      status: 'pending',
    });

    const response = await request(app)
      .get('/api/applications/my-applications')
      .set(getAuthHeader(regularUserToken))
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('_id');
    expect(response.body[0]).toHaveProperty('resume');
    expect(response.body[0]).toHaveProperty('status');
    expect(response.body[0]).toHaveProperty('listingId');
  });

  test('should return empty array when user has no applications', async () => {
    const response = await request(app)
      .get('/api/applications/my-applications')
      .set(getAuthHeader(regularUserToken))
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should fail when user is not authenticated', async () => {
    const response = await request(app)
      .get('/api/applications/my-applications')
      .expect(401);

    expect(response.body.message).toBeDefined();
  });

  test('should populate listing details in applications', async () => {
    const regularUser = await Users.findOne({
      email: 'sarah.cohen@email.com',
    });
    const activeListing = await Listings.findOne({ isActive: true });

    await Applications.create({
      listingId: activeListing._id,
      applicantId: regularUser._id,
      resume:
        'Experienced software developer with 5 years of experience in full-stack development.',
      status: 'pending',
    });

    const response = await request(app)
      .get('/api/applications/my-applications')
      .set(getAuthHeader(regularUserToken))
      .expect(200);

    expect(response.body[0].listingId).toHaveProperty('jobTitle');
    expect(response.body[0].listingId).toHaveProperty('companyName');
  });
});

describe('GET /api/applications/listing/:listingId - Get Listing Applications', () => {
  let regularUserToken;
  let businessUserToken;
  let businessListing;
  let businessUser;

  beforeEach(async () => {
    regularUserToken = await getRegularUserToken();
    businessUserToken = await getBusinessUserToken();
    businessUser = await Users.findOne({ email: 'david.levi@email.com' });
    businessListing = await Listings.findOne({
      businessId: businessUser._id,
      isActive: true,
    });
  });

  test('should return applications for listing when user owns the listing', async () => {
    const applicant = await Users.findOne({ email: 'sarah.cohen@email.com' });

    // Create a test application
    await Applications.create({
      listingId: businessListing._id,
      applicantId: applicant._id,
      resume:
        'Experienced software developer with 5 years of experience in full-stack development.',
      status: 'pending',
    });

    const response = await request(app)
      .get(`/api/applications/listing/${businessListing._id}`)
      .set(getAuthHeader(businessUserToken))
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('should fail when user does not own the listing', async () => {
    const response = await request(app)
      .get(`/api/applications/listing/${businessListing._id}`)
      .set(getAuthHeader(regularUserToken))
      .expect(403);

    expect(response.body.message).toBe(
      'Not authorized to view these applications',
    );
  });

  test('should fail when listing does not exist', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const response = await request(app)
      .get(`/api/applications/listing/${fakeId}`)
      .set(getAuthHeader(businessUserToken))
      .expect(404);

    expect(response.body.message).toBe('Listing not found');
  });

  test('should fail when user is not authenticated', async () => {
    const response = await request(app)
      .get(`/api/applications/listing/${businessListing._id}`)
      .expect(401);

    expect(response.body.message).toBeDefined();
  });

  test('should populate applicant details in applications', async () => {
    const applicant = await Users.findOne({ email: 'sarah.cohen@email.com' });

    await Applications.create({
      listingId: businessListing._id,
      applicantId: applicant._id,
      resume:
        'Experienced software developer with 5 years of experience in full-stack development.',
      status: 'pending',
    });

    const response = await request(app)
      .get(`/api/applications/listing/${businessListing._id}`)
      .set(getAuthHeader(businessUserToken))
      .expect(200);

    expect(response.body[0]).toHaveProperty('applicantId');
    expect(response.body[0].applicantId).toHaveProperty('jobseekerProfile');
  });
});
