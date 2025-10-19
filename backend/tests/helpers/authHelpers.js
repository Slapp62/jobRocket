const { generateAuthToken } = require("../../auth/providers/jwt");
const Users = require("../../validation/mongoSchemas/usersSchema");

const getUserToken = async (email) => {
  const user = await Users.findOne({ email });
  if (!user) {
    throw new Error(`Test user with email ${email} not found`);
  }
  const token = generateAuthToken(user);
  return token;
};

const getAuthHeader = (token) => {
  return { "x-auth-token": token };
};

const getRegularUserToken = async () => {
  return await getUserToken("sarah.cohen@email.com");
};

const getBusinessUserToken = async () => {
  return await getUserToken("david.levi@email.com");
};

const getAdminUserToken = async () => {
  return await getUserToken("admin@email.com");
};

module.exports = {
  getUserToken,
  getAuthHeader,
  getRegularUserToken,
  getBusinessUserToken,
  getAdminUserToken,
};
