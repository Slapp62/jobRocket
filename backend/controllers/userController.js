const userService = require('../services/userService.js');
const { handleSuccess, handleError } = require('../utils/functionHandlers.js');
const { logAuth, logError } = require('../utils/logHelpers.js');

async function registerUser(req, res) {
  try {
    const userData = req.body;
    const resumeFile = req.file;
    const user = await userService.registerUser(userData, resumeFile);

    // Log successful registration
    logAuth('register', user._id, {
      profileType: user.profileType,
      email: user.email,
      ip: req.ip,
      hasResume: !!resumeFile,
    });

    handleSuccess(res, 201, user, 'User registered successfully.');
  } catch (error) {
    // Log registration failure
    logError(error, {
      operation: 'user-registration',
      email: req.body.email,
      profileType: req.body.profileType,
      ip: req.ip,
    });
    handleError(res, error.status, error.message);
  }
}

async function loginUser(req, res) {
  try {
    const user = req.user;
    // Create session
    req.session.userId = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.profileType = user.profileType;
    req.session.lastActivity = Date.now();

    // Save session to MongoDB BEFORE responding
    req.session.save((err) => {
      if (err) {
        logError(new Error('Session creation failed'), {
          operation: 'user-login',
          userId: user._id,
          ip: req.ip,
        });
        return handleError(res, 500, 'Failed to create session');
      }

      // Log successful login
      logAuth('login', user._id, {
        profileType: user.profileType,
        email: user.email,
        ip: req.ip,
        sessionId: req.sessionID,
      });

      handleSuccess(res, 200, user, 'Login successful.');
    });
  } catch (error) {
    logError(error, {
      operation: 'user-login',
      email: req.body?.email,
      ip: req.ip,
    });
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
  const userId = req.session?.userId;
  const profileType = req.session?.profileType;

  req.session.destroy((err) => {
    if (err) {
      logError(new Error('Session destruction failed'), {
        operation: 'user-logout',
        userId,
        ip: req.ip,
      });
      return handleError(res, 500, 'Could not log out');
    }

    // Log successful logout
    if (userId) {
      logAuth('logout', userId, {
        profileType,
        ip: req.ip,
      });
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
    const resumeFile = req.file;
    const updatedUser = await userService.updateProfile(userId, updateData, resumeFile);
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
