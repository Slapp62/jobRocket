const Cards = require("../validation/mongoSchemas/cardsSchema");
const _ = require("lodash");

const generateRandomNumber = async () => {
  let randomNumber;
  let numberExists;

  do {
    // 1. Generate number
    randomNumber = _.random(1000000, 9999999);
    // 2. Check if taken
    numberExists = await Cards.exists({ bizNumber: randomNumber });
  } while (numberExists); // 3. If taken, repeat. If not, exit

  return randomNumber;
};

const normalizeCard = async (cardData, userId) => {
  const randomNumber = await generateRandomNumber();
  const normalizedCard = {
    ...cardData,
    bizNumber: randomNumber,
    user_id: userId,
  };

  return normalizedCard;
};

module.exports = normalizeCard;
