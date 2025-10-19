const express = require("express");
const {
  getAllUsers,
  registerUser,
  getUserById,
  toggleRole,
  updateProfile,
  deleteUser,
} = require("../services/userService.js");
const { handleSuccess, handleError } = require("../utils/functionHandlers.js");
const {
  profileValidation,
  loginValidation,
} = require("../middleware/userValidation.js");
const {
  authenticateUser,
  adminAuth,
  userAdminAuth,
  lockoutCheck,
  verifyCredentials,
} = require("../middleware/authService.js");
const { generateAuthToken } = require("../auth/providers/jwt.js");

const userRouter = express.Router();

// 1 - Register a new user
userRouter.post("/", profileValidation, async (req, res) => {
  try {
    const userData = req.body;
    const user = await registerUser(userData);

    handleSuccess(res, 201, user, "User registered successfully.");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 2 - User login
userRouter.post(
  "/login",
  loginValidation,
  lockoutCheck,
  verifyCredentials,
  async (req, res) => {
    try {
      const token = generateAuthToken(req.user);
      handleSuccess(res, 200, token, "Login successful");
    } catch (error) {
      handleError(res, error.status, error.message);
    }
  },
);

// 3 - Get all users - Admin only
userRouter.get("/", authenticateUser, adminAuth, async (_req, res) => {
  try {
    const users = await getAllUsers();
    handleSuccess(res, 200, users, "Users fetched successfully.");
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

// 4 - Get user by ID
userRouter.get("/:id", authenticateUser, userAdminAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    handleSuccess(res, 200, user, "User fetched successfully.");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 5 - Update user profile - User only
userRouter.put("/:id", authenticateUser, userAdminAuth, async (req, res) => {
  try {
    const userId = req.params.id;

    const updateData = req.body;
    const updatedUser = await updateProfile(userId, updateData);
    handleSuccess(res, 200, updatedUser, "Profile updated successfully.");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 6 - Toggle user role - User only
userRouter.patch("/:id", authenticateUser, userAdminAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await toggleRole(userId);
    handleSuccess(res, 200, updatedUser, "Role updated successfully.");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 7 - Delete user
userRouter.delete("/:id", authenticateUser, userAdminAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    await deleteUser(userId);
    handleSuccess(res, 200, "User deleted successfully.");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

module.exports = userRouter;
