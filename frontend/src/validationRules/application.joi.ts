import Joi from 'joi';

const applicationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false }}).required(),
  phone: Joi.string().required(),
  coverLetter: Joi.string().required(),
  resume: Joi.string().required(),
})

export { applicationSchema }
