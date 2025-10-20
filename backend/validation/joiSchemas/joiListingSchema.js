const joi = require("joi");
const { INDUSTRIES } = require("../../data/industries.js");
const { WORK_ARRANGEMENTS } = require("../../data/workArr.js");
const { CITIES, REGIONS } = require("../../data/israelCities.js");

const joiListingSchema = joi.object({
  jobTitle: joi
    .string()
    .min(5)
    .max(100)
    .pattern(/^[a-zA-Z\s.,;:!?'"()\-&/]+$/)
    .required()
    .messages({
      "string.pattern.base":
        "Job title can only contain letters, spaces, and basic punctuation",
      "string.min": "Job title must be at least 5 characters long",
      "string.max": "Job title cannot exceed 100 characters",
      "any.required": "Job title is required",
    }),
  jobDescription: joi.string().min(10).required().messages({
    "string.min": "Job description must be at least 10 characters long",
    "any.required": "Job description is required",
  }),
  requirements: joi.array().items(joi.string()).optional(),
  advantages: joi.array().items(joi.string()).optional(),
  apply: joi
    .object({
      method: joi.string().valid("email", "link").required().messages({
        "any.only": "Application method must be either 'email' or 'link'",
        "any.required": "Application method is required",
      }),
      contact: joi.string().required().messages({
        "any.required": "Contact information is required",
      }),
    })
    .required(),
  location: joi
    .object({
      region: joi
        .string()
        .valid(...REGIONS)
        .required()
        .messages({
          "any.only": "Region must be a valid Israeli region",
          "any.required": "Region is required",
        }),
      city: joi
        .string()
        .valid(...CITIES)
        .required()
        .messages({
          "any.only": "City must be a valid Israeli city",
          "any.required": "City is required",
        }),
    })
    .required(),
  workArrangement: joi
    .string()
    .valid(...WORK_ARRANGEMENTS)
    .required()
    .messages({
      "any.only": "Work arrangement must be a valid option",
      "any.required": "Work arrangement is required",
    }),
  industry: joi
    .string()
    .valid(...INDUSTRIES)
    .required()
    .messages({
      "any.only": "Industry must be a valid option",
      "any.required": "Industry is required",
    }),
  isActive: joi.boolean().optional(),
  expiresAt: joi.date().optional().allow(null),
});

module.exports = joiListingSchema;
