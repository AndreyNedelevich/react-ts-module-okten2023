import Joi from "joi";

const CommentValidator = Joi.object({
    email: Joi.string().email({tlds:false})
        .required().messages({
            'string.empty': 'Це поле обов\'язкове',
            'string.email':'Адрес электронной почты имеет неверный формат'
    }),
    name: Joi.string().min(3).max(40).required().messages({
        'string.empty': 'Це поле обов\'язкове'
    }),
    body: Joi.string().min(3).max(40).required().messages({
        'string.empty': 'Це поле обов\'язкове'
    })
});



const UserValidator = Joi.object({
    email: Joi.string().email({tlds:false})
        .required().messages({
            'string.empty': 'Це поле обов\'язкове',
            'string.email':'Адрес электронной почты имеет неверный формат'
        }),
    name: Joi.string().min(3).max(40).required().messages({
        'string.empty': 'Це поле обов\'язкове'
    }),
    username: Joi.string().min(3).max(40).required().messages({
        'string.empty': 'Це поле обов\'язкове'
    })
});
export {
    CommentValidator,
    UserValidator
}
