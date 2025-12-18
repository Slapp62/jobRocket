const joi = require('joi');

const joiApplicationSchema = joi.object({
  firstName: joi.string().required().min(2).max(30).messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be between 2 and 30 characters',
  }),
  lastName: joi.string().required().min(2).max(30).messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be between 2 and 30 characters',
  }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Email must be a valid email address',
    }),
  phone: joi
    .string()
    .pattern(/^0(?:5[0-9]|[2-4689])(?:-?\d{3}(?:-?\d{4}))$/)
    .allow('') // allows empty string
    .optional()
    .messages({
      'string.pattern.base': 'Phone must be a valid Israeli phone number.',
    }),
  resume: joi.string().max(1024).optional().allow(''),
  message: joi.string().optional().allow('').min(10).max(2000),
  applicationDataConsent: joi
    .boolean()
    .valid(true)
    .required()
    .messages({
      'any.only': 'You must consent to sharing your data with this employer',
      'any.required': 'Application consent is required',
    }),
});

module.exports = joiApplicationSchema;
