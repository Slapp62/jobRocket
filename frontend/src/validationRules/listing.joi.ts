import Joi from "joi";
// @ts-ignore
import WORK_ARRANGEMENTS from "@/data/workArr";
// @ts-ignore
import INDUSTRIES from "@/data/industries";
// @ts-ignore
import { REGIONS, CITIES } from "@/data/israelCities";

export const listingSchema = Joi.object({
  jobTitle: Joi.string()
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
  jobDescription: Joi.string().min(10).required().messages({
    "string.min": "Job description must be at least 10 characters long",
    "any.required": "Job description is required",
  }),
  requirements: Joi.array().items(Joi.string().trim()).default([]),
  advantages: Joi.array().items(Joi.string().trim()).default([]),
  apply: Joi.object({
    method: Joi.string().valid("email", "link").required(),
    contact: Joi.string().required().messages({
      "any.required": "Application contact is required",
    }),
  }).required(),
  location: Joi.object({
    region: Joi.string()
      .valid(...REGIONS)
      .required()
      .messages({
        "any.only": "Region must be a valid Israeli region",
        "any.required": "Region is required",
      }),
    city: Joi.string()
      .valid(...CITIES)
      .required()
      .messages({
        "any.only": "City must be a valid Israeli city",
        "any.required": "City is required",
      }),
  }).required(),
  workArrangement: Joi.string()
    .valid(...WORK_ARRANGEMENTS)
    .required()
    .messages({
      "any.only": "Work arrangement must be a valid option",
      "any.required": "Work arrangement is required",
    }),
  industry: Joi.string()
    .valid(...INDUSTRIES)
    .required()
    .messages({
      "any.only": "Industry must be a valid option",
      "any.required": "Industry is required",
    }),
  isActive: Joi.boolean().default(true),
  expiresAt: Joi.string().allow("", null),
});
