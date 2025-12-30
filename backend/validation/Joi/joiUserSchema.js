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
    .alternatives()
    .try(
      joi
        .string()
        .pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
        )
        .messages({
          'string.pattern.base':
            'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        }),
      joi.allow(null, '') // Allow null or empty string for Google OAuth users
    )
    .optional(),

  phone: joi
    .string()
    .pattern(/^0(?:5[0-9]|[2-4689])(?:-?\d{3}(?:-?\d{4}))$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base':
        'Phone must be a valid Israeli phone number (e.g., 052-1234567 or 02-1234567)',
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
          'Other'
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
          region: joi.when('country', {
            is: joi.string().pattern(/^israel$/i), // Case-insensitive match for "Israel"
            then: joi
              .string()
              .valid(...REGIONS)
              .required()
              .messages({
                'any.only': 'Please select a valid Israeli region',
                'string.empty': 'Region is required for Israeli businesses',
                'any.required': 'Region is required for Israeli businesses',
              }),
            otherwise: joi.any().strip(),
          }),
          city: joi.when('country', {
            is: joi.string().pattern(/^israel$/i), // Case-insensitive match for "Israel"
            then: joi
              .string()
              .valid(...CITIES)
              .required()
              .messages({
                'any.only': 'Please select a valid Israeli city',
                'string.empty': 'City is required for Israeli businesses',
                'any.required': 'City is required for Israeli businesses',
              }),
            otherwise: joi.any().strip(),
          }),
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

  // Consent structure with timestamps for GDPR/Israeli Amendment 13 compliance
  consents: joi
    .object({
      ageConfirmation: joi
        .object({
          granted: joi.boolean().valid(true).required(),
          timestamp: joi.date().required(),
          ipAddress: joi.string().optional(),
          userAgent: joi.string().optional(),
        })
        .when('...profileType', {
          is: 'jobseeker',
          then: joi.required(),
          otherwise: joi.optional(),
        }),
      dataProcessing: joi
        .object({
          granted: joi.boolean().valid(true).required(),
          timestamp: joi.date().required(),
          ipAddress: joi.string().optional(),
          userAgent: joi.string().optional(),
        })
        .required(),
    })
    .required(),

  // Legacy boolean fields for backward compatibility (will be removed in future)
  ageConfirmation: joi.boolean().optional(),
  terms: joi.boolean().optional(),
  dataProcessingConsent: joi.boolean().optional(),
});

module.exports = joiUserSchema;
