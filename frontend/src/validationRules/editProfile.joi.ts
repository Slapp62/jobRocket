import Joi from 'joi';
import { CITIES, REGIONS } from '../data/israelCities';

const editProfileSchema = Joi.object({
  phone: Joi.string()
    .required()
    .pattern(/^0(?:5[0-9]|[2-4689])(?:-?\d{3}(?:-?\d{4}))$/)
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone must be a valid Israeli phone number.',
    }),

  profileType: Joi.string().valid('jobseeker', 'business').required().messages({
    'any.only': 'Profile type must be either jobseeker or business',
    'string.empty': 'Profile type is required',
    'any.required': 'Profile type is required',
  }),

  jobseekerProfile: Joi.when('profileType', {
    is: 'jobseeker',
    then: Joi.object({
      firstName: Joi.string().min(2).max(256).required().messages({
        'string.min': 'First name is too short',
        'string.empty': 'First name is required',
        'any.required': 'First name is required',
      }),
      lastName: Joi.string().min(2).max(256).required().messages({
        'string.min': 'Last name is too short',
        'string.empty': 'Last name is required',
        'any.required': 'Last name is required',
      }),
      highestEducation: Joi.string()
        .valid(
          'High School',
          'Associate Degree',
          "Bachelor's Degree",
          "Master's Degree",
          'Doctorate',
          'Other'
        )
        .required()
        .messages({
          'any.only': 'Please select a valid education level',
          'string.empty': 'Education level is required',
          'any.required': 'Education level is required',
        }),
      preferredWorkArrangement: Joi.string().required().messages({
        'string.empty': 'Preferred work arrangement is required',
        'any.required': 'Preferred work arrangement is required',
      }),
      linkedinPage: Joi.string().uri().allow('').optional().messages({
        'string.uri': 'Please enter a valid LinkedIn URL',
      }),
      resume: Joi.string().max(1024).allow('').optional().messages({
        'string.max': 'Resume URL cannot exceed 1024 characters',
      }),
      skills: Joi.array()
        .items(
          Joi.string().max(50).messages({
            'string.max': 'Each skill must be 50 characters or less',
          })
        )
        .max(25)
        .optional()
        .default([])
        .messages({
          'array.max': 'Maximum 25 skills allowed',
        }),
      description: Joi.string().max(2000).allow('').optional().messages({
        'string.max': 'Description cannot exceed 2000 characters',
      }),
    }).required(),
    otherwise: Joi.forbidden(),
  }),

  businessProfile: Joi.when('profileType', {
    is: 'business',
    then: Joi.object({
      companyName: Joi.string().min(2).max(256).required().messages({
        'string.min': 'Business name is too short',
        'string.empty': 'Business name is required',
        'any.required': 'Business name is required',
      }),
      location: Joi.object({
        country: Joi.string().min(2).max(256).required().messages({
          'string.min': 'Country is too short',
          'string.empty': 'Country is required',
          'any.required': 'Country is required',
        }),
        region: Joi.string()
          .valid(...REGIONS)
          .required()
          .messages({
            'any.only': 'Please select a valid region',
            'string.empty': 'Region is required',
            'any.required': 'Region is required',
          }),
        city: Joi.string()
          .valid(...CITIES)
          .required()
          .messages({
            'any.only': 'Please select a valid city',
            'string.empty': 'City is required',
            'any.required': 'City is required',
          }),
      }).required(),
      logo: Joi.object({
        url: Joi.string().uri().allow('').optional().messages({
          'string.uri': 'Please enter a valid logo URL',
        }),
        alt: Joi.string().max(256).allow('').optional(),
      }).optional(),
      numberOfEmployees: Joi.string()
        .valid('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')
        .required()
        .messages({
          'any.only': 'Please select a valid employee range',
          'string.empty': 'Number of employees is required',
          'any.required': 'Number of employees is required',
        }),
      website: Joi.string().uri().max(512).allow('').optional().messages({
        'string.uri': 'Please enter a valid website URL',
      }),
      contactEmail: Joi.string()
        .email({ tlds: { allow: false } })
        .allow('')
        .optional()
        .messages({
          'string.email': 'Please enter a valid contact email',
        }),
      socialMedia: Joi.object({
        linkedin: Joi.string().uri().max(512).allow('').optional().messages({
          'string.uri': 'Please enter a valid LinkedIn URL',
        }),
        twitter: Joi.string().uri().max(512).allow('').optional().messages({
          'string.uri': 'Please enter a valid Twitter URL',
        }),
        facebook: Joi.string().uri().max(512).allow('').optional().messages({
          'string.uri': 'Please enter a valid Facebook URL',
        }),
      }).optional(),
      description: Joi.string().max(2000).allow('').optional().messages({
        'string.max': 'Description cannot exceed 2000 characters',
      }),
    }).required(),
    otherwise: Joi.forbidden(),
  }),
});

export { editProfileSchema };
