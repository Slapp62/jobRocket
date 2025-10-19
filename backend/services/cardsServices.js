const Cards = require("../validation/mongoSchemas/cardsSchema");
const { throwError } = require("../utils/functionHandlers");
const { normalizeCardResponse } = require("../utils/normalizeResponses");

const getAllCards = async () => {
  const cards = await Cards.find({});
  if (cards.length === 0) {
    throwError(404, "No cards found");
  }
  const normalizedCards = cards.map((card) => normalizeCardResponse(card));
  return normalizedCards;
};

const createCard = async (cardData) => {
  const newCard = new Cards(cardData);
  const savedCard = await newCard.save();
  const normalizedCard = normalizeCardResponse(savedCard);
  return normalizedCard;
};

const getCardById = async (id) => {
  const card = await Cards.findById(id);
  if (!card) {
    throwError(404, "Card not found");
  }
  const normalizedCard = normalizeCardResponse(card);
  return normalizedCard;
};

const getUserCards = async (userId) => {
  const userCards = await Cards.find({ user_id: userId });
  if (userCards.length === 0) {
    throwError(404, "User has no cards");
  }

  const normalizedUserCards = userCards.map((card) =>
    normalizeCardResponse(card),
  );
  return normalizedUserCards;
};

const getLikedCards = async (userId) => {
  const likedCards = await Cards.find({ likes: { $in: userId } });
  if (likedCards.length === 0) {
    throwError(404, "User has no liked cards");
  }
  const normalizedLikedCards = likedCards.map((card) =>
    normalizeCardResponse(card),
  );
  return normalizedLikedCards;
};

const editCardById = async (cardId, updateData) => {
  const updatedCard = await Cards.findByIdAndUpdate(cardId, updateData, {
    new: true,
  });
  if (!updatedCard) {
    throwError(404, "Card not found");
  }

  const normalizedUpdatedCard = normalizeCardResponse(updatedCard);
  return normalizedUpdatedCard;
};

const deleteCardById = async (cardId) => {
  const deletedCard = await Cards.findByIdAndDelete(cardId);
  if (!deletedCard) {
    throwError(404, "Card not found");
  }
  const normalizedDeletedCard = normalizeCardResponse(deletedCard);
  return normalizedDeletedCard;
};

const toggleLike = async (cardId, userId) => {
  const card = await Cards.findById(cardId);

  if (!card) {
    throwError(400, "Card not found.");
  }

  if (card.likes.includes(userId)) {
    const idIndex = card.likes.indexOf(userId);
    card.likes.splice(idIndex, 1);
  } else {
    card.likes.push(userId);
  }
  const savedCard = await card.save();
  const normalizedSavedCard = normalizeCardResponse(savedCard);
  return normalizedSavedCard;
};

const changeBizNumber = async (cardId, newNumber) => {
  const isInUse = await Cards.exists({ bizNumber: Number(newNumber) });
  if (isInUse) {
    throwError(400, "Business number already in use.");
  }

  const updatedCard = await Cards.findByIdAndUpdate(
    cardId,
    { bizNumber: newNumber },
    { new: true },
  );

  if (!updatedCard) {
    throwError(404, "Card not found");
  }

  const normalizedUpdatedCard = normalizeCardResponse(updatedCard);
  return normalizedUpdatedCard;
};

module.exports = {
  getAllCards,
  createCard,
  getCardById,
  getUserCards,
  getLikedCards,
  editCardById,
  deleteCardById,
  toggleLike,
  changeBizNumber,
};
