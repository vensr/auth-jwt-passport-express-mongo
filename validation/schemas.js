const Joi = require('joi')

const UserModel = require("../model/user")

const schemas = {
    userLogin: Joi.object().keys({
        email: Joi.string().required().email().max(100),
        password: Joi.string().required().max(20)
    }),
    userRegistration: Joi.object().keys({
        email: Joi.string().required().email().max(100),
        password: Joi.string().required().max(20)
    })

    // define all the other schemas below 
};

module.exports = schemas;
