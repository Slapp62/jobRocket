const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserProfile,
  toggleUserRole,
  deleteUser,
} = require('../controllers/userController.js');
const {
  profileValidation,
  loginValidation,
} = require('../middleware/userValidation.js');
const {
  authenticateUser,
  adminAuth,
  userAdminAuth,
  lockoutCheck,
  verifyCredentials,
} = require('../middleware/authService.js');
const {
  loginLimiter,
  registrationLimiter,
} = require('../middleware/rateLimiter.js');

const router = express.Router();

// Register a new user
router.post('/', registrationLimiter, profileValidation, registerUser);

// User login
router.post(
  '/login',
  loginLimiter,
  loginValidation,
  lockoutCheck,
  verifyCredentials,
  loginUser
);

// Get all users (admin only)
router.get('/', authenticateUser, adminAuth, getAllUsers);

// Get user by ID
router.get('/:id', authenticateUser, userAdminAuth, getUserById);

// Update user profile
router.put('/:id', authenticateUser, userAdminAuth, updateUserProfile);

// Toggle user role
router.patch('/:id', authenticateUser, userAdminAuth, toggleUserRole);

// Delete user
router.delete('/:id', authenticateUser, userAdminAuth, deleteUser);

module.exports = router;
