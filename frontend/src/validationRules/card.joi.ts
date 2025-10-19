import Joi from 'joi'

const cardSchema = Joi.object({
    title: Joi.string().min(2).max(256).required().messages({
        'string.min':'Title is too short',
        'string.empty':'This field is required',
        'any.required': 'Field is required',
    }),

    subtitle: Joi.string().min(2).max(256).required().messages({
        'string.min':'Subtitle is too short',
        'string.empty':'This field is required',
        'any.required': 'Field is required',
    }),

    description: Joi.string().min(2).max(1024).required().messages({
        'string.min':'Description is too short',
        'string.empty':'This field is required',
        'any.required': 'Field is required',
    }),
    
    phone: Joi.string().required().pattern(/^0(?:5[0-9]|[2-4689])(?:-?\d{3}(?:-?\d{4}))$/).messages({
            'string.empty':'This field is required',
            'string.pattern.base':'Phone must be a valid Israeli phone number.',
    }),

    email: Joi.string().email({tlds: {allow:false}}).pattern(/\.[a-zA-Z]{2,}$/).required().messages({
        'string.email':'Please enter a valid email',
        'string.empty':'This field is required',
        'any.required': 'Email is required',
        'string.pattern.base': 'Email must end with at least two letters after the dot',
    }),

    web: Joi.string().uri().allow('').optional().messages({
        'string.uri':'Please enter a valid URL',
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
            'string.empty':'This field is required',
            'any.required':'Country is required',
        }),
        city: Joi.string().min(2).max(256).required().messages({
            'string.min':'City is too short',
            'string.empty': 'This field is required',
            'any.required':'City is required',
        }),
        street: Joi.string().min(2).max(256).required().messages({
            'string.min':'Street is too short',
            'string.empty': 'This field is required',
            'any.required':'Street is required',
        }),
        houseNumber: Joi.string().pattern(/^\d+$/).min(1).max(15).required().messages({
            'string.pattern.base':'House Number must be a number',
            'string.min':'House Number is too short',
           'string.empty': 'This field is required',
            'any.required':'House Number is required',
        }),
        zip: Joi.string().pattern(/^\d+$/).min(1).max(15).required().messages({
            'string.pattern.base':'Zipcode must be a number',
            'string.min':'Zipcode is too short',
            'string.max':'Zipcode is too long',
            'string.empty': 'This field is required',
            'any.required':'Zipcode is required',
        }),        
    }),
    
})

export {cardSchema}