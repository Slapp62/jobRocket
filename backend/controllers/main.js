const { Router } = require("express");
const userRouter = require("./usersController.js");
const cardRouter = require("./cardsController.js");
const { handleError } = require("../utils/functionHandlers.js");

const router = Router();

// main api router
router.use("/api/users", userRouter);
router.use("/api/cards", cardRouter);

// 404 handler
router.use((_req, res) => {
  handleError(res, 404, "Route not found");
});

module.exports = router;
