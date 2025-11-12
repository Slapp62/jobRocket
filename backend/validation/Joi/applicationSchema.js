const joi = require('joi');

const joiApplicationSchema = joi.object({
  resume: joi.string().required().min(50).max(5000).messages({
    'any.required': 'Resume is required',
  }),
  coverLetter: joi.string().optional().min(50).max(2000),
  message: joi.string().optional().min(50).max(5000),
});

module.exports = joiApplicationSchema;
