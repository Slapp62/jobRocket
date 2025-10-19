const express = require("express");
const {
  getAllCards,
  getCardById,
  getUserCards,
  getLikedCards,
  deleteCardById,
  toggleLike,
  changeBizNumber,
  editCardById,
} = require("../services/cardsServices.js");
const { createCard } = require("../services/cardsServices.js");
const { handleSuccess, handleError } = require("../utils/functionHandlers.js");
const {
  authenticateUser,
  businessAuth,
  cardCreatorAuth,
  adminAuth,
  cardCreatorAdminAuth,
} = require("../middleware/authService.js");
const cardValidation = require("../middleware/cardValidation.js");
const normalizeCard = require("../utils/normalizeCard.js");

const cardRouter = express.Router();

// 1 - get all cards
cardRouter.get("/", async (_req, res) => {
  try {
    const cards = await getAllCards();
    handleSuccess(res, 200, cards, "Cards fetched successfully");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 2 - get cards by user id
cardRouter.get("/my-cards", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const userCards = await getUserCards(userId);
    handleSuccess(res, 200, userCards, "User cards fetched successfully");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// *Bonus - get liked cards by user id
cardRouter.get("/liked", authenticateUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const likedCards = await getLikedCards(userId);
    handleSuccess(res, 200, likedCards, "Liked cards fetched successfully");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 3 - get card by id
cardRouter.get("/:id", async (req, res) => {
  try {
    const cardId = req.params.id;
    const card = await getCardById(cardId);
    handleSuccess(res, 200, card, "Card fetched successfully");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 4 - create a new card
cardRouter.post(
  "/",
  authenticateUser,
  businessAuth,
  cardValidation,
  async (req, res) => {
    try {
      const cardData = req.body;
      const normalizedCard = await normalizeCard(cardData, req.user._id);
      const newCard = await createCard(normalizedCard);
      handleSuccess(res, 201, newCard, "Card created successfully");
    } catch (error) {
      handleError(res, error.status, error.message);
    }
  },
);

// 5 - edit card by id
cardRouter.put(
  "/:id",
  authenticateUser,
  cardCreatorAuth,
  cardValidation,
  async (req, res) => {
    try {
      const cardId = req.params.id;
      const cardData = req.body;
      const updatedCard = await editCardById(cardId, cardData);
      handleSuccess(res, 200, updatedCard, "Card updated successfully");
    } catch (error) {
      handleError(res, error.status, error.message);
    }
  },
);

// 6 - add like to card
cardRouter.patch("/:id", authenticateUser, async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user._id;
    const updatedCard = await toggleLike(cardId, userId);
    handleSuccess(res, 200, updatedCard, "Card liked successfully");
  } catch (error) {
    handleError(res, error.status, error.message);
  }
});

// 7 - delete card by id
cardRouter.delete(
  "/:id",
  authenticateUser,
  cardCreatorAdminAuth,
  async (req, res) => {
    try {
      const cardId = req.params.id;
      const deletedCard = await deleteCardById(cardId);
      handleSuccess(res, 200, deletedCard, "Card deleted successfully");
    } catch (error) {
      handleError(res, error.status, error.message);
    }
  },
);

// *Bonus - Change business number
cardRouter.patch(
  "/bizNumber/:id",
  authenticateUser,
  adminAuth,
  async (req, res) => {
    try {
      const cardId = req.params.id;
      const { newBizNumber } = req.body;
      const updatedCard = await changeBizNumber(cardId, newBizNumber);
      handleSuccess(res, 200, updatedCard, "Card updated successfully");
    } catch (error) {
      handleError(res, error.status, error.message);
    }
  },
);

module.exports = cardRouter;
