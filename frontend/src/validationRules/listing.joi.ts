import Joi from 'joi';
import { CITIES, REGIONS } from '../data/israelCities.ts';
import WORK_ARRANGEMENTS from '../data/workArr.ts';

export const listingSchema = Joi.object({
  companyName: Joi.string().min(2).max(256).required().messages({
    'string.min': 'Company name must be at least 2 characters long',
    'string.max': 'Company name cannot exceed 256 characters',
    'any.required': 'Company name is required',
  }),
  jobTitle: Joi.string()
    .min(5)
    .max(100)
    .pattern(/^[a-zA-Z\s.,;:!?'"()\-&/]+$/)
    .required()
    .messages({
      'string.empty': 'Job title is required',
      'string.pattern.base': 'Job title can only contain letters, spaces, and basic punctuation',
      'string.min': 'Job title must be at least 5 characters long',
      'string.max': 'Job title cannot exceed 100 characters',
      'any.required': 'Job title is required',
    }),
  jobDescription: Joi.string().min(10).required().messages({
    'string.empty': 'Job description is required',
    'string.min': 'Job description must be at least 10 characters long',
    'any.required': 'Job description is required',
  }),
  requirements: Joi.array()
    .items(Joi.string().trim().max(100).messages({
      'string.max': 'Each requirement must be 100 characters or less',
    }))
    .max(20)
    .default([])
    .messages({
      'array.max': 'Maximum 20 requirements allowed',
    }),
  advantages: Joi.array()
    .items(Joi.string().trim().max(100).messages({
      'string.max': 'Each advantage must be 100 characters or less',
    }))
    .max(20)
    .default([])
    .messages({
      'array.max': 'Maximum 20 advantages allowed',
    }),
  apply: Joi.object({
    method: Joi.object({
      jobRocketSystem: Joi.boolean().default(false),
      companySystem: Joi.boolean().default(false),
      email: Joi.boolean().default(false),
    })
      .required()
      .custom((value, helpers) => {
        const count =
          (value.jobRocketSystem ? 1 : 0) +
          (value.companySystem ? 1 : 0) +
          (value.email ? 1 : 0);

        if (count !== 1) {
          return helpers.error('apply.method.exactly_one');
        }

        return value;
      })
      .messages({
        'apply.method.exactly_one': 'Exactly one application method must be selected',
      }),
    contact: Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .when('$apply.method.email', {
          is: true,
          then: Joi.required(),
          otherwise: Joi.optional().allow(''),
        })
        .messages({
          'string.email': 'Please provide a valid email address',
          'any.required': 'Email address is required when email method is selected',
        }),
      link: Joi.string()
        .uri()
        .when('$apply.method.companySystem', {
          is: true,
          then: Joi.required(),
          otherwise: Joi.optional().allow(''),
        })
        .messages({
          'string.uri': 'Please provide a valid URL',
          'any.required': 'External link is required when company system is selected',
        }),
    }).optional(),
  }).required(),
  location: Joi.object({
    region: Joi.string()
      .valid(...REGIONS)
      .required()
      .messages({
        'any.only': 'Region must be a valid Israeli region',
        'any.required': 'Region is required',
      }),
    city: Joi.string()
      .valid(...CITIES)
      .required()
      .messages({
        'any.only': 'City must be a valid Israeli city',
        'any.required': 'City is required',
      }),
  }).required(),
  workArrangement: Joi.string()
    .valid(...WORK_ARRANGEMENTS)
    .required()
    .messages({
      'any.only': 'Work arrangement must be a valid option',
      'any.required': 'Work arrangement is required',
    }),
  isActive: Joi.boolean().default(true),
  expiresAt: Joi.string().allow('', null),
});
