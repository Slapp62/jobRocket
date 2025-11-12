const { nextError } = require('../utils/functionHandlers');
const joiListingSchema = require('../validation/Joi/joiListingSchema');

const listingValidation = (req, res, next) => {
  const { error } = joiListingSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return nextError(next, 400, error.details[0].message);
  }
  next();
};

module.exports = listingValidation;
