const { Router } = require("express");
const userRouter = require("./userRoutes.js");
const listingRouter = require("./listingRoutes.js");
const recommendationRouter = require("./recommendationRoutes.js");
const { handleError } = require("../utils/functionHandlers.js");
const router = Router();

// main api router
router.use("/api/users", userRouter);
router.use("/api/listings", listingRouter);
router.use("/api/recommendations", recommendationRouter);

// 404 handler
router.use((_req, res) => {
  handleError(res, 404, "Route not found");
});

module.exports = router;