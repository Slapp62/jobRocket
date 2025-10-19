import Joi from 'joi'

const editProfileSchema = Joi.object({
    name: {
        first: Joi.string().min(2).max(256).required().messages({
            'string.min':'First name is too short',
            'string.empty':'First name is required',
            'any.required': 'First name is required',
        }),
        middle: Joi.string().min(2).max(256).optional().allow(''),
        last: Joi.string().min(2).max(256).required().messages({
            'string.min':'Last name is too short',
            'string.empty':'Last name is required',
            'any.required': 'Last name is required',
        })
    },

    phone: Joi.string().required().pattern(/^0(?:5[0-9]|[2-4689])(?:-?\d{3}(?:-?\d{4}))$/).messages({
        'string.empty':'Phone number is required',
        'string.pattern.base':'Phone must be a valid Israeli phone number.',
    }),

    image: Joi.object({
        url: Joi.string().uri().empty('').messages({
            'string.uri':'Please enter a valid URL',
        }),
        alt: Joi.string().min(2).max(256).empty('').messages({
            'string.min':'Alt text is too short',
        }),
    }).optional(),

    address: Joi.object({
        state: Joi.string().min(2).max(256).allow('').optional().messages({
            'string.min':'State is too short',
        }),
        country: Joi.string().min(2).max(256).required().messages({
            'string.min':'Country is too short',
            'string.empty':'Country is required',
            'any.required':'Country is required',
        }),
        city: Joi.string().min(2).max(256).required().messages({
            'string.min':'City is too short',
            'string.empty':'City is required',
            'any.required':'City is required',
        }),
        street: Joi.string().min(2).max(256).required().messages({
            'string.min':'Street is too short',
            'string.empty':'Street is required',
            'any.required':'Street is required',
        }),
        houseNumber: Joi.string().pattern(/^\d+$/).min(1).max(15).required().messages({
            'string.pattern.base':'House Number must be a number',
            'string.min':'House Number is too short',
            'string.empty':'House Number is required',
            'any.required':'House Number is required',
        }),
        zip: Joi.string().pattern(/^\d+$/).min(1).max(15).required().messages({
            'string.pattern.base':'Zipcode must be a number',
            'string.min':'Zipcode is too short',
            'string.empty':'Zipcode is required',
            'any.required':'Zipcode is required',
        }),
    }),

    isBusiness: Joi.boolean()
})

export {editProfileSchema}


