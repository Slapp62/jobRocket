const { encryptPassword } = require("../utils/bcrypt");
const { throwError } = require("../utils/functionHandlers");
const Users = require("../validation/mongoSchemas/usersSchema");
const { normalizeUserResponse } = require("../utils/normalizeResponses.js");

const getAllUsers = async () => {
  const users = await Users.find().select("-password").lean();
  if (!users || users.length === 0) {
    throwError(400, "No users found");
  }
  const normalizedUsers = users.map((user) => normalizeUserResponse(user));
  return normalizedUsers;
};

const registerUser = async (userData) => {
  const existingUser = await Users.findOne({ email: userData.email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.status = 400;
    throw error;
  }

  const encryptedPassword = await encryptPassword(userData.password);
  userData.password = encryptedPassword;

  const newUser = new Users(userData);
  const savedUser = await newUser.save();
  const normalizedUser = normalizeUserResponse(savedUser);
  return normalizedUser;
};

const getUserById = async (userId) => {
  const user = await Users.findById(userId);
  if (!user) {
    throwError(404, "User not found");
  }
  const normalizedUser = normalizeUserResponse(user);
  return normalizedUser;
};

const updateProfile = async (userId, updateData) => {
  const updatedUser = await Users.findByIdAndUpdate(userId, updateData, {
    new: true,
  });
  if (!updatedUser) {
    throwError(404, "User not found");
  }
  const normalizedUser = normalizeUserResponse(updatedUser);
  return normalizedUser;
};

const toggleRole = async (userId) => {
  const user = await Users.findById(userId);
  if (!user) {
    throwError(404, "User not found");
  }
  const isBusiness = !user.isBusiness;
  const updatedUser = await Users.findByIdAndUpdate(
    userId,
    { isBusiness },
    { new: true },
  );
  const normalizedUser = normalizeUserResponse(updatedUser);
  return normalizedUser;
};

const deleteUser = async (userId) => {
  const deletedUser = await Users.findByIdAndDelete(userId);
  if (!deletedUser) {
    throwError(404, "User not found");
  }
  const normalizedUser = normalizeUserResponse(deletedUser);
  return normalizedUser;
};

module.exports = {
  getAllUsers,
  registerUser,
  getUserById,
  toggleRole,
  updateProfile,
  deleteUser,
};
