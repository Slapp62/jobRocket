const joi = require("joi");

const joiUserSchema = joi.object({
  name: joi
    .object({
      first: joi.string().min(2).max(256).required(),
      middle: joi.string().min(2).max(256).optional().allow(""),
      last: joi.string().min(2).max(256).required(),
    })
    .required(),

  phone: joi
    .string()
    .pattern(
      /^(\+972[-\s]?|972[-\s]?|0)((2|3|4|8|9)[-\s]?\d{7}|5[0-9][-\s]?\d{7})$/,
    )
    .required(),

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

  image: joi
    .object({
      url: joi.string().uri().optional().empty(""),
      alt: joi.string().max(256).optional().empty(""),
    })
    .optional(),

  address: joi
    .object({
      state: joi.string().max(256).optional().allow(""),
      country: joi.string().min(2).max(256).required(),
      city: joi.string().min(2).max(256).required(),
      street: joi.string().min(2).max(256).required(),
      houseNumber: joi.number().integer().required(),
      zip: joi.number().integer().required(),
    })
    .required(),

  isAdmin: joi.boolean().optional(),
  isBusiness: joi.boolean().optional(),
});

module.exports = joiUserSchema;
