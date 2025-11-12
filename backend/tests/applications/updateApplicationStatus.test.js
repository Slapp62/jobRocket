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

describe('PATCH /api/applications/:id - Update Application Status', () => {
  let regularUserToken;
  let businessUserToken;
  let businessListing;
  let businessUser;
  let testApplication;

  beforeEach(async () => {
    regularUserToken = await getRegularUserToken();
    businessUserToken = await getBusinessUserToken();
    businessUser = await Users.findOne({ email: 'david.levi@email.com' });
    const applicant = await Users.findOne({ email: 'sarah.cohen@email.com' });
    businessListing = await Listings.findOne({
      businessId: businessUser._id,
      isActive: true,
    });

    // Create a test application
    testApplication = await Applications.create({
      listingId: businessListing._id,
      applicantId: applicant._id,
      resume:
        'Experienced software developer with 5 years of experience in full-stack development.',
      status: 'pending',
    });
  });

  test('should successfully update application status when user owns the listing', async () => {
    const response = await request(app)
      .patch(`/api/applications/${testApplication._id}`)
      .set(getAuthHeader(businessUserToken))
      .send({ status: 'reviewed' })
      .expect(200);

    expect(response.body.status).toBe('reviewed');
  });

  test('should successfully update status from reviewed to rejected', async () => {
    testApplication.status = 'reviewed';
    await testApplication.save();

    const response = await request(app)
      .patch(`/api/applications/${testApplication._id}`)
      .set(getAuthHeader(businessUserToken))
      .send({ status: 'rejected' })
      .expect(200);

    expect(response.body.status).toBe('rejected');
  });

  test('should fail when user does not own the listing', async () => {
    const response = await request(app)
      .patch(`/api/applications/${testApplication._id}`)
      .set(getAuthHeader(regularUserToken))
      .send({ status: 'reviewed' })
      .expect(403);

    expect(response.body.message).toBe('Not authorized');
  });

  test('should fail when application does not exist', async () => {
    const fakeId = '507f1f77bcf86cd799439011';
    const response = await request(app)
      .patch(`/api/applications/${fakeId}`)
      .set(getAuthHeader(businessUserToken))
      .send({ status: 'reviewed' })
      .expect(404);

    expect(response.body.message).toBe('Application not found');
  });

  test('should fail when user is not authenticated', async () => {
    const response = await request(app)
      .patch(`/api/applications/${testApplication._id}`)
      .send({ status: 'reviewed' })
      .expect(401);

    expect(response.body.message).toBeDefined();
  });

  test('should accept all valid status values', async () => {
    const validStatuses = ['pending', 'reviewed', 'rejected'];

    for (const status of validStatuses) {
      const response = await request(app)
        .patch(`/api/applications/${testApplication._id}`)
        .set(getAuthHeader(businessUserToken))
        .send({ status })
        .expect(200);

      expect(response.body.status).toBe(status);
    }
  });

  test('should handle invalid application ID format gracefully', async () => {
    const response = await request(app)
      .patch('/api/applications/invalid-id')
      .set(getAuthHeader(businessUserToken))
      .send({ status: 'reviewed' });

    expect(response.body.message).toBeDefined();
  });
});
