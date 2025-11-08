const joi = require("joi");

const joiLoginSchema = joi.object({
  email: joi.string().email({ tlds: { allow: false } }).required(),
  password: joi
    .string()
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    )
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

module.exports = joiLoginSchema;
