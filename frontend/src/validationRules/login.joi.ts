import Joi from 'joi'

const loginSchema = Joi.object({
    email:
        Joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Please enter a valid email',
            'string.empty': 'This field cannot be empty',
            'any.required': 'Email is required',
        }),

    password:
        Joi
        .string()
        .required()
        .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)
        .messages({
            'string.pattern.base':'Password must be a minimum 8 characters and contain at least one uppercase letter, number, and special character',
            'string.empty': 'This field cannot be empty',
            'any.required': 'Password is required',
        }),

    rememberMe: Joi.boolean(),
})

export {loginSchema}