const Users = require('../../models/Users');
const request = require('supertest');
const app = require('../../app');

/**
 * Login helper that returns an authenticated agent with session
 * @param {string} email - User email
 * @param {string} password - User password (default: 'Password123!')
 * @returns {Promise<object>} - Supertest agent with authenticated session
 */
const loginUser = async (email, password = 'Password123!') => {
  const agent = request.agent(app);

  const response = await agent
    .post('/api/users/login')
    .send({ email, password });

  if (response.status !== 200) {
    throw new Error(`Login failed for ${email}: ${response.body.message || response.status}`);
  }

  return agent;
};

/**
 * Get a user from database by email
 * @param {string} email - User email
 * @returns {Promise<object>} - User document
 */
const getUserByEmail = async (email) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error(`Test user with email ${email} not found`);
  }
  return user;
};

/**
 * Login as regular user (jobseeker)
 * @returns {Promise<object>} - Authenticated agent
 */
const loginAsRegularUser = async () => {
  return await loginUser('sarah.cohen@email.com');
};

/**
 * Login as business user
 * @returns {Promise<object>} - Authenticated agent
 */
const loginAsBusinessUser = async () => {
  return await loginUser('david.levi@email.com');
};

/**
 * Login as admin user
 * @returns {Promise<object>} - Authenticated agent
 */
const loginAsAdminUser = async () => {
  return await loginUser('admin@email.com');
};

module.exports = {
  loginUser,
  getUserByEmail,
  loginAsRegularUser,
  loginAsBusinessUser,
  loginAsAdminUser,
};
