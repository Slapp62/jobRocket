const joiLoginSchema = require('../validation/Joi/joiLoginSchema');
const joiUserSchema = require('../validation/Joi/joiUserSchema');
const { nextError } = require('../utils/functionHandlers');

const profileValidation = (req, res, next) => {
  const { error } = joiUserSchema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log('❌ BACKEND VALIDATION FAILED');
    console.log(
      '📋 Errors:',
      error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message,
        type: d.type,
      }))
    );
    console.log('📦 Data received:', JSON.stringify(req.body, null, 2));
    return nextError(next, 400, error.details[0].message);
  }
  next();
};

const loginValidation = (req, res, next) => {
  const { error } = joiLoginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return nextError(next, 400, error.details[0].message);
  }
  next();
};

module.exports = {
  profileValidation,
  loginValidation,
};
