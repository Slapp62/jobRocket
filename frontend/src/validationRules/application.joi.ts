import Joi from 'joi';

const applicationSchema = Joi.object({
  firstName: Joi
    .string()
    .required()
    .min(2)
    .max(30)
    .messages({
      'string.empty': 'First name is required',
      'string.min': 'First name must be between 2 and 30 characters',
    }),
  lastName: Joi
    .string()
    .required()
    .min(2)
    .max(30)
    .messages({
      'string.empty': 'Last name is required',
    'string.min': 'Last name must be between 2 and 30 characters',
  }),
  email: Joi
    .string()
    .email({ tlds: { allow: false }})
    .required()
    .messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  phone: Joi
    .string()
    .pattern(/^0(?:5[0-9]|[2-4689])(?:-?\d{3}(?:-?\d{4}))$/)
    .allow('') // allows empty string
    .optional()
    .messages({
      'string.pattern.base': 'Phone must be a valid Israeli phone number.'
  }),
  resume: Joi
    .string()
    .required()
    .min(10)
    .max(500)
    .messages({
    'string.empty': 'Resume is required',
    'string.min': 'Resume must be at least 10 characters',
  }),
  message: Joi
    .string()
    .min(10)
    .max(2000)
    .allow('')
    .optional()
    .messages({
    'string.min': 'Message must be at least 10 characters',
  })
})

export { applicationSchema }
