const request = require('supertest');
const app = require('../../app');
const Users = require('../../models/Users');

describe('POST /api/users - Register User', () => {
  describe('Jobseeker Registration', () => {
    test('should successfully register a jobseeker with valid data', async () => {
      const userData = {
        email: 'test.jobseeker@example.com',
        password: 'Password123!',
        phone: '050-1234567',
        profileType: 'jobseeker',
        jobseekerProfile: {
          firstName: 'Test',
          lastName: 'Jobseeker',
          highestEducation: "Bachelor's Degree",
          preferredWorkArrangement: 'Hybrid',
          linkedinPage: 'https://linkedin.com/in/testjobseeker',
          skills: ['JavaScript', 'React', 'Node.js'],
          professionalSummary: 'Experienced software developer',
        },
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject({
        email: userData.email,
        profileType: 'jobseeker',
        jobseekerProfile: {
          firstName: userData.jobseekerProfile.firstName,
          lastName: userData.jobseekerProfile.lastName,
          highestEducation: userData.jobseekerProfile.highestEducation,
          preferredWorkArrangement:
            userData.jobseekerProfile.preferredWorkArrangement,
        },
      });
      expect(response.body).toHaveProperty('_id');
      expect(response.body).not.toHaveProperty('password'); // Password should not be returned
      expect(response.body).toHaveProperty('createdAt');

      // Verify user was created in database
      const user = await Users.findById(response.body._id);
      expect(user).toBeTruthy();
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password); // Should be encrypted
    });

    test('should fail when required jobseeker fields are missing', async () => {
      const userData = {
        email: 'test.jobseeker2@example.com',
        password: 'Password123!',
        phone: '050-1234567',
        profileType: 'jobseeker',
        jobseekerProfile: {
          firstName: 'Test',
          // lastName missing
          highestEducation: "Bachelor's Degree",
          preferredWorkArrangement: 'Hybrid',
        },
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body.message).toBeDefined();
    });

    test('should fail when email is invalid', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'Password123!',
        phone: '050-1234567',
        profileType: 'jobseeker',
        jobseekerProfile: {
          firstName: 'Test',
          lastName: 'Jobseeker',
          highestEducation: "Bachelor's Degree",
          preferredWorkArrangement: 'Hybrid',
        },
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body.message).toContain('email');
    });

    test('should fail when password is weak', async () => {
      const userData = {
        email: 'test.jobseeker3@example.com',
        password: 'weak',
        phone: '050-1234567',
        profileType: 'jobseeker',
        jobseekerProfile: {
          firstName: 'Test',
          lastName: 'Jobseeker',
          highestEducation: "Bachelor's Degree",
          preferredWorkArrangement: 'Hybrid',
        },
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body.message).toContain('Password');
    });
  });

  describe('Business Registration', () => {
    test('should successfully register a business with valid data', async () => {
      const userData = {
        email: 'test.business@example.com',
        password: 'Password123!',
        phone: '050-1234567',
        profileType: 'business',
        businessProfile: {
          companyName: 'Test Company Ltd',
          location: {
            country: 'Israel',
            region: 'Center',
            city: 'Tel Aviv',
          },
          industry: 'Technology',
          numberOfEmployees: '11-50',
          website: 'https://www.testcompany.com',
          contactEmail: 'contact@testcompany.com',
          description: 'A test company for unit testing',
          socialMedia: {
            linkedin: 'https://linkedin.com/company/testcompany',
            twitter: 'https://twitter.com/testcompany',
            facebook: 'https://facebook.com/testcompany',
          },
        },
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toMatchObject({
        email: userData.email,
        profileType: 'business',
        businessProfile: {
          companyName: userData.businessProfile.companyName,
          location: userData.businessProfile.location,
          industry: userData.businessProfile.industry,
          numberOfEmployees: userData.businessProfile.numberOfEmployees,
        },
      });
      expect(response.body).toHaveProperty('_id');
      expect(response.body).not.toHaveProperty('password');
      expect(response.body).toHaveProperty('createdAt');

      // Verify user was created in database
      const user = await Users.findById(response.body._id);
      expect(user).toBeTruthy();
      expect(user.email).toBe(userData.email);
    });

    test('should fail when industry field is missing', async () => {
      const userData = {
        email: 'test.business2@example.com',
        password: 'Password123!',
        phone: '050-1234567',
        profileType: 'business',
        businessProfile: {
          companyName: 'Test Company Ltd',
          location: {
            country: 'Israel',
            region: 'Center',
            city: 'Tel Aviv',
          },
          // industry missing
          numberOfEmployees: '11-50',
        },
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body.message).toBeDefined();
    });

    test('should fail when industry value is invalid', async () => {
      const userData = {
        email: 'test.business3@example.com',
        password: 'Password123!',
        phone: '050-1234567',
        profileType: 'business',
        businessProfile: {
          companyName: 'Test Company Ltd',
          location: {
            country: 'Israel',
            region: 'Center',
            city: 'Tel Aviv',
          },
          industry: 'InvalidIndustry',
          numberOfEmployees: '11-50',
        },
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body.message).toContain('industry');
    });
  });

  describe('Duplicate Email Handling', () => {
    test('should fail when email already exists', async () => {
      // First registration
      const userData = {
        email: 'duplicate@example.com',
        password: 'Password123!',
        phone: '050-1234567',
        profileType: 'jobseeker',
        jobseekerProfile: {
          firstName: 'Test',
          lastName: 'User',
          highestEducation: "Bachelor's Degree",
          preferredWorkArrangement: 'Hybrid',
        },
      };

      await request(app).post('/api/users').send(userData).expect(201);

      // Attempt duplicate registration
      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body.message).toContain('already exists');
    });
  });

  describe('Google OAuth Registration', () => {
    test('should allow password to be null for Google OAuth users', async () => {
      const userData = {
        email: 'google.user@example.com',
        password: null, // Google OAuth users have no password
        phone: '050-1234567',
        profileType: 'jobseeker',
        googleId: '1234567890',
        jobseekerProfile: {
          firstName: 'Google',
          lastName: 'User',
          highestEducation: "Bachelor's Degree",
          preferredWorkArrangement: 'Hybrid',
        },
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body.email).toBe(userData.email);
      expect(response.body.profileType).toBe('jobseeker');

      // Verify user was created with null password
      const user = await Users.findById(response.body._id);
      expect(user.password).toBeNull();
      expect(user.googleId).toBe(userData.googleId);
    });
  });
});
