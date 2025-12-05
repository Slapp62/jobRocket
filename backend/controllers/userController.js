const userService = require('../services/userService.js');
const { handleSuccess, handleError } = require('../utils/functionHandlers.js');

async function registerUser(req, res) {
  try {
    const userData = req.body;
    const user = await userService.registerUser(userData);
    handleSuccess(res, 201, user, 'User registered successfully.');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function loginUser(req, res) {
  try {
    const userId = req.user._id;
    const user = await userService.getUserById(userId);
    // Create session
    req.session.userId = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.profileType = user.profileType;
    req.session.lastActivity = Date.now();

    handleSuccess(res, 200, user, 'Login successful.');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function getCurrentUser(req, res) {
  try {
    const userId = req.user._id;
    const user = await userService.getUserById(userId);
    handleSuccess(res, 200, user, 'User data fetched successfully.');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return handleError(res, 500, 'Could not log out');
    }
    
    res.clearCookie('sessionId'); // Must match the name in sessionConfig
    handleSuccess(res, 200, null, 'Logged out successfully');
  });
}

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    handleSuccess(res, 200, users, 'Users fetched successfully.');
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
}

async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    handleSuccess(res, 200, user, 'User fetched successfully.');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function updateUserProfile(req, res) {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await userService.updateProfile(userId, updateData);
    handleSuccess(res, 200, updatedUser, 'Profile updated successfully.');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function toggleUserRole(req, res) {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.toggleRole(userId);
    handleSuccess(res, 200, updatedUser, 'Role updated successfully.');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userId);
    handleSuccess(res, 200, 'User deleted successfully.');
  } catch (error) {
    handleError(res, error.status, error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUserProfile,
  toggleUserRole,
  deleteUser,
};
