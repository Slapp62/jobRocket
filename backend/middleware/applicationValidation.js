const { nextError } = require('../utils/functionHandlers');
const joiApplicationSchema = require('../validation/Joi/applicationSchema');

const applicationValidation = (req, res, next) => {
  const { error } = joiApplicationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return nextError(next, 400, error.details[0].message);
  }
  next();
};

module.exports = applicationValidation;
