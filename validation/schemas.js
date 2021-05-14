const Joi = require('joi')
const schemas = {
    userLogin: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
    userRegistration: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    // define all the other schemas below 
};
module.exports = schemas;
