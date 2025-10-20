const { Router } = require("express");
const userRouter = require("./usersController.js");
const listingRouter = require("./listingsController.js");
const { handleError } = require("../utils/functionHandlers.js");

const router = Router();

// main api router
router.use("/api/users", userRouter);
router.use("/api/listings", listingRouter);

// 404 handler
router.use((_req, res) => {
  handleError(res, 404, "Route not found");
});

module.exports = router;
