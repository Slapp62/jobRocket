const { Router } = require("express");
const userRouter = require("./usersController.js");
const listingRouter = require("./listingsController.js");
const { handleError } = require("../utils/functionHandlers.js");
const { getMatchScore } = require('./recommendationController');
const { authenticateUser } = require('../middleware/authService');
const router = Router();

// main api router
router.use("/api/users", userRouter);
router.use("/api/listings", listingRouter);
router.get('/api/recommendations/match-score/:listingId', authenticateUser, getMatchScore);
// 404 handler
router.use((_req, res) => {
  handleError(res, 404, "Route not found");
});

module.exports = router;