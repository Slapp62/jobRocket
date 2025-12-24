const request = require('supertest');
const app = require('../../app');
const {
  getRegularUserToken,
  getBusinessUserToken,
  getAuthHeader,
} = require('../helpers/authHelpers');
const Listings = require('../../models/Listings');
const Applications = require('../../models/Applications');

describe('POST /api/applications/:listingId - Submit Application', () => {
  let regularUserToken;
  let businessUserToken;
  let activeListing;

  beforeEach(async () => {
    regularUserToken = await getRegularUserToken();
    businessUserToken = await getBusinessUserToken();
    activeListing = await Listings.findOne({ isActive: true });
  });

  test('should successfully submit an application with valid data', async () => {
    const applicationData = {
      resume:
        'Experienced software developer with 5 years of experience in full-stack development, specializing in React and Node.js.',
      message:
        'I would love to discuss this opportunity further and learn more about the role.',
    };

    const response = await request(app)
      .post(`/api/applications/${activeListing._id}`)
      .set(getAuthHeader(regularUserToken))
      .send(applicationData)
      .expect(201);

    expect(response.body).toMatchObject({
      listingId: activeListing._id.toString(),
      resume: applicationData.resume,
      message: applicationData.message,
      status: 'pending',
    });
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('createdAt');
  });

  test('should successfully submit an application with only required fields', async () => {
    const applicationData = {
      resume:
        'Experienced software developer with 5 years of experience in full-stack development.',
    };

    const response = await request(app)
      .post(`/api/applications/${activeListing._id}`)
      .set(getAuthHeader(regularUserToken))
      .send(applicationData)
      .expect(201);

    expect(response.body.resume).toBe(applicationData.resume);
    expect(response.body.message).toBeUndefined();
  });

  test('should fail when resume is missing', async () => {
    const applicationData = {
      message: 'I am interested in this position.',
    };

    const response = await request(app)
      .post(`/api/applications/${activeListing._id}`)
      .set(getAuthHeader(regularUserToken))
      .send(applicationData)
      .expect(400);

    expect(response.body.message).toContain('Resume is required');
  });

  test('should fail when resume is too short', async () => {
    const applicationData = {
      resume: 'Too short',
    };

    const response = await request(app)
      .post(`/api/applications/${activeListing._id}`)
      .set(getAuthHeader(regularUserToken))
      .send(applicationData)
      .expect(400);

    expect(response.body.message).toBeDefined();
  });

  test('should fail when applying to non-existent listing', async () => {
    const applicationData = {
      resume:
        'Experienced software developer with 5 years of experience in full-stack development.',
    };

    const fakeId = '507f1f77bcf86cd799439011';
    const response = await request(app)
      .post(`/api/applications/${fakeId}`)
      .set(getAuthHeader(regularUserToken))
      .send(applicationData)
      .expect(404);

    expect(response.body.message).toBe('Listing not found');
  });

  test('should fail when applying to inactive listing', async () => {
    // First find an active listing to get a businessId
    const anyListing = await Listings.findOne({});

    // Create an inactive listing with all required fields
    const inactiveListing = await Listings.create({
      businessId: anyListing.businessId,
      companyName: 'Test Company',
      jobTitle: 'Software Engineer Position',
      jobDescription: 'This is a test job description for an inactive listing.',
      requirements: ['Test requirement'],
      industry: 'Software Development',
      workArrangement: 'Remote',
      location: {
        city: 'Tel Aviv',
        region: 'Center',
      },
      apply: {
        method: 'email',
        contact: 'test@example.com',
      },
      isActive: false,
    });

    const applicationData = {
      resume:
        'Experienced software developer with 5 years of experience in full-stack development.',
    };

    const response = await request(app)
      .post(`/api/applications/${inactiveListing._id}`)
      .set(getAuthHeader(regularUserToken))
      .send(applicationData)
      .expect(400);

    expect(response.body.message).toBe('Cannot apply to inactive listing');
  });

  test('should fail when user is not authenticated', async () => {
    const applicationData = {
      resume:
        'Experienced software developer with 5 years of experience in full-stack development.',
    };

    const response = await request(app)
      .post(`/api/applications/${activeListing._id}`)
      .send(applicationData)
      .expect(401);

    expect(response.body.message).toBeDefined();
  });

  test('should prevent duplicate applications to the same listing', async () => {
    const applicationData = {
      resume:
        'Experienced software developer with 5 years of experience in full-stack development.',
    };

    // First application
    await request(app)
      .post(`/api/applications/${activeListing._id}`)
      .set(getAuthHeader(regularUserToken))
      .send(applicationData)
      .expect(201);

    // Duplicate application
    const response = await request(app)
      .post(`/api/applications/${activeListing._id}`)
      .set(getAuthHeader(regularUserToken))
      .send(applicationData)
      .expect(500);

    expect(response.body.message).toBeDefined();
  });
});
