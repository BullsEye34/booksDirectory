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

const loginValidation = data=>{
    const schema = Jio.object({
        email:Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    });
}

module.exports.registerValidation=registerValidation;