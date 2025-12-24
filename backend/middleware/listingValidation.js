const { nextError } = require('../utils/functionHandlers');
const joiListingSchema = require('../validation/Joi/joiListingSchema');

const listingValidation = (req, res, next) => {
  // Calculate max expiration date (90 days from now)
  const maxExpirationDate = new Date();
  maxExpirationDate.setDate(maxExpirationDate.getDate() + 90);

  const { error } = joiListingSchema.validate(req.body, {
    abortEarly: false,
    context: { maxExpirationDate },
  });

  if (error) {
    return nextError(next, 400, error.details[0].message);
  }
  next();
};

module.exports = listingValidation;
