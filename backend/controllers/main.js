const { Router } = require("express");
const userRouter = require("../routes/userRoutes.js");
const listingRouter = require("../routes/listingRoutes.js");
const recommendationRouter = require("../routes/recommendationRoutes.js");
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