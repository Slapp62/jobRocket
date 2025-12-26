const joi = require('joi');
const { WORK_ARRANGEMENTS } = require('../../data/workArr');
const { CITIES, REGIONS } = require('../../data/israelCities.js');

// Industries for business profiles (not job listings)
const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Construction',
  'Transportation',
  'Hospitality',
  'Real Estate',
  'Media',
  'Telecommunications',
  'Energy',
  'Agriculture',
  'Professional Services',
  'Government',
  'Non-Profit',
  'Other',
];

const joiUserSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi
    .string()
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
    )
    .messages({
      'string.pattern.base':
        'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),

  phone: joi
    .string()
    .pattern(/^0(?:5[0-9]|[2-4689])(?:-?\d{3}(?:-?\d{4}))$/)
    .required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone must be a valid Israeli phone number (e.g., 052-1234567 or 02-1234567)',
    }),

  profileType: joi.string().valid('jobseeker', 'business').required(),

  jobseekerProfile: joi
    .object({
      firstName: joi.string().min(2).max(256).required(),
      lastName: joi.string().min(2).max(256).required(),
      highestEducation: joi
        .string()
        .valid(
          'High School',
          'Associate Degree',
          "Bachelor's Degree",
          "Master's Degree",
          'Doctorate',
          'Other',
        )
        .required(),
      preferredWorkArrangement: joi
        .string()
        .valid(...WORK_ARRANGEMENTS)
        .required(),
      linkedinPage: joi.string().uri().max(512).optional().allow(''),
      resume: joi.string().max(1024).optional().allow(''),
      skills: joi
        .array()
        .items(joi.string().max(50))
        .max(25)
        .optional()
        .default([]),
      description: joi.string().max(2000).optional().allow(''),
    })
    .when('profileType', {
      is: 'jobseeker',
      then: joi.required(),
      otherwise: joi.forbidden(),
    }),

  businessProfile: joi
    .object({
      companyName: joi.string().min(2).max(256).required(),
      location: joi
        .object({
          country: joi.string().min(2).max(256).required(),
          region: joi
            .string()
            .valid(...REGIONS)
            .required(),
          city: joi
            .string()
            .valid(...CITIES)
            .required(),
        })
        .required(),
      logo: joi
        .object({
          url: joi.string().uri().optional().empty(''),
          alt: joi.string().max(256).optional().empty(''),
        })
        .optional(),
      industry: joi
        .string()
        .valid(...INDUSTRIES)
        .required(),
      numberOfEmployees: joi
        .string()
        .valid('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')
        .required(),
      website: joi.string().uri().max(512).optional().allow(''),
      contactEmail: joi
        .string()
        .email({ tlds: { allow: false } })
        .optional()
        .allow(''),
      socialMedia: joi
        .object({
          linkedin: joi.string().uri().max(512).optional().allow(''),
          twitter: joi.string().uri().max(512).optional().allow(''),
          facebook: joi.string().uri().max(512).optional().allow(''),
        })
        .optional(),
      description: joi.string().max(2000).optional().allow(''),
    })
    .when('profileType', {
      is: 'business',
      then: joi.required(),
      otherwise: joi.forbidden(),
    }),

  isAdmin: joi.boolean().optional(),

  ageConfirmation: joi.boolean().valid(true).required().messages({
    'any.only': 'You must confirm that you are at least 16 years old',
    'any.required': 'Age confirmation is required',
  }),

  terms: joi.boolean().valid(true).required().messages({
    'any.only': 'You must agree to the terms and conditions to register.',
    'any.required': 'The terms and conditions checkbox is required.',
  }),

  dataProcessingConsent: joi.boolean().valid(true).required().messages({
    'any.only': 'You must consent to data processing to create an account',
    'any.required': 'Data processing consent is required',
  }),
});

module.exports = joiUserSchema;
