const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUserProfile,
  toggleUserRole,
  deleteUser,
  getCurrentUser,
  exportUserData,
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
} = require('../middleware/authMiddleware.js');
const {
  loginLimiter,
  registrationLimiter,
} = require('../middleware/rateLimiter.js');
const upload = require('../middleware/multer.js');

const router = express.Router();

// Register a new user
router.post(
  '/',
  registrationLimiter,
  upload.single('resume'),
  profileValidation,
  registerUser,
);

// User login
router.post(
  '/login',
  loginLimiter,
  loginValidation,
  lockoutCheck,
  verifyCredentials,
  loginUser,
);

// Get current user
router.get('/current', authenticateUser, getCurrentUser);

router.post('/logout', logoutUser);

// Get all users (admin only)
router.get('/', authenticateUser, adminAuth, getAllUsers);

// Get user by ID
router.get('/:id', authenticateUser, userAdminAuth, getUserById);

// Update user profile
router.put(
  '/:id',
  authenticateUser,
  userAdminAuth,
  upload.single('resume'),
  updateUserProfile,
);

// Toggle user role
router.patch('/:id', authenticateUser, userAdminAuth, toggleUserRole);

// Delete user
router.delete('/:id', authenticateUser, userAdminAuth, deleteUser);

// Export user data (GDPR data portability)
router.get('/export/data', authenticateUser, exportUserData);

module.exports = router;
