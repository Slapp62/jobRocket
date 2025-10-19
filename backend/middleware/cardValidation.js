const { nextError } = require("../utils/functionHandlers");
const joiCardSchema = require("../validation/joiSchemas/joiCardSchema");

const cardValidation = (req, res, next) => {
  const { error } = joiCardSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return nextError(next, 400, error.details[0].message);    
  }
  next();
};

module.exports = cardValidation;
