/** 
 * joi lets you describe your data using a simple, intuitive, and readable language.
 * ttps://joi.dev/api/?v=17.6.1
 */
const Joi = require('joi');

/**
 * Schema of a userForm
 * @typedef {object} userForm
 * @property {string} firstname.required - Firstname of the user
 * @property {string} lastname.required - Lastname of the user
 * @property {string} email.required - EMail of the user
 * @property {string} password.required - Password of the user
 * @property {string} confirmPassword.required - Password of the user
 */

const userForm = Joi.object({ 
    firstname:Joi.string().required(), 
    lastname: Joi.string().required(),
    email:Joi.string().required(), 
    password:Joi.string().required(), 
    confirmPassword:Joi.string().required()
});

/**
 * Schema of a loginForm
 * @typedef {object} loginForm
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Password of the user
 */
const loginForm = Joi.object({ 
    email:Joi.string().required(), 
    password:Joi.string().required(), 
});

/**
 * Schema of a sucess Response
 * @typedef {object} successResponse
 * @property {string} status - Description of the success
 */

/**
 * Schema of a bad Response
 * @typedef {object} badResponse
 * @property {string} error - Description of the error
 */

/**
 * Schema of a success login response
 * @typedef {object} loginResponse
 * @property {string} accesstoken - JWT for the user connected
 * @property {string} user - Name of the user connected
 */



module.exports = { userForm, loginForm } ;