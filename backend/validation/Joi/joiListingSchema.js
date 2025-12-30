const joi = require('joi');
const { WORK_ARRANGEMENTS } = require('../../data/workArr.js');
const { CITIES, REGIONS } = require('../../data/israelCities.js');

const joiListingSchema = joi.object({
  companyName: joi.string().min(2).max(256).required().messages({
    'string.min': 'Company name must be at least 2 characters long',
    'string.max': 'Company name cannot exceed 256 characters',
    'any.required': 'Company name is required',
  }),
  jobTitle: joi
    .string()
    .min(5)
    .max(100)
    .pattern(/^[a-zA-Z\s.,;:!?'"()\-&/]+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Job title can only contain letters, spaces, and basic punctuation',
      'string.min': 'Job title must be at least 5 characters long',
      'string.max': 'Job title cannot exceed 100 characters',
      'any.required': 'Job title is required',
    }),
  jobDescription: joi.string().min(10).required().messages({
    'string.min': 'Job description must be at least 10 characters long',
    'any.required': 'Job description is required',
  }),
  requirements: joi.array().items(joi.string().max(100)).max(20).optional(),
  advantages: joi.array().items(joi.string().max(100)).max(20).optional(),
  apply: joi
    .object({
      method: joi
        .object({
          jobRocketSystem: joi.boolean().default(false),
          companySystem: joi.boolean().default(false),
          email: joi.boolean().default(false),
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
          'apply.method.exactly_one':
            'Exactly one application method must be selected',
        }),
      contact: joi
        .object({
          email: joi
            .string()
            .email()
            .when('...method.email', {
              is: true,
              then: joi.required(),
              otherwise: joi.optional().allow(''),
            })
            .messages({
              'string.email': 'Please provide a valid email address',
              'any.required':
                'Email address is required when email method is selected',
            }),
          link: joi
            .string()
            .uri()
            .when('...method.companySystem', {
              is: true,
              then: joi.required(),
              otherwise: joi.optional().allow(''),
            })
            .messages({
              'string.uri': 'Please provide a valid URL',
              'any.required':
                'External link is required when company system is selected',
            }),
        })
        .optional(),
    })
    .required(),
  location: joi
    .object({
      region: joi
        .string()
        .valid(...REGIONS)
        .required()
        .messages({
          'any.only': 'Region must be a valid Israeli region',
          'any.required': 'Region is required',
        }),
      city: joi
        .string()
        .valid(...CITIES)
        .required()
        .messages({
          'any.only': 'City must be a valid Israeli city',
          'any.required': 'City is required',
        }),
    })
    .required(),
  workArrangement: joi
    .string()
    .valid(...WORK_ARRANGEMENTS)
    .required()
    .messages({
      'any.only': 'Work arrangement must be a valid option',
      'any.required': 'Work arrangement is required',
    }),
  isActive: joi.boolean().optional(),
  expiresAt: joi
    .date()
    .min('now')
    .max(joi.ref('$maxExpirationDate'))
    .required()
    .messages({
      'date.min': 'Expiration date cannot be in the past',
      'date.max': 'Expiration date cannot exceed 90 days from today',
      'any.required': 'Expiration date is required',
    }),
});

module.exports = joiListingSchema;
