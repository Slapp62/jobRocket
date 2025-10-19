const joi = require("joi");

const joiCardSchema = joi.object({
  title: joi.string().min(2).max(256).required(),
  subtitle: joi.string().min(2).max(256).required(),
  description: joi.string().min(2).max(1024).required(),
  phone: joi
    .string()
    .pattern(
      /^(\+972[-\s]?|972[-\s]?|0)((2|3|4|8|9)[-\s]?\d{7}|5[0-9][-\s]?\d{7})$/,
    )
    .required(),
  email: joi.string().email({ tlds: { allow: false } }).required(),
  web: joi.string().uri().optional().allow(""),
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
});

module.exports = joiCardSchema;
