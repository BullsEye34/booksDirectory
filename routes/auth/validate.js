const Joi = require('joi');

const registerValidation = data=> {
    const schema = Joi.object({
        name: Joi.string().min(3).max(25).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
        phone: Joi.number().max(9999999999).min(1000000000),
        img: Joi.string().uri()
    });

    return schema.validate(data)
}

module.exports.registerValidation=registerValidation;