/** **** */
/*  AUTH */
/** **** */
const { Router } = require("express");
const router = new Router();

// Controllers called by routes
const authController = require('../controllers/authController');

/**
* POST /register
* @summary Validate form register 
* @tags Authentication / Register
* @param {UserForm} request.body - email of the user
* @return  200 - success response - application/json 
* @example request - New user
* {
*     "firstname" : "Prénom",
*     "lastname" : "Nom",
*     "email" : "example1@domain.com",
*     "password": "Example1234",
*     "confirmPassword": "Example1234"
* }
*/
router.post('/register', authController.doRegister);

/**
* POST /login
* @summary Validate form authentication 
* @tags Authentication / Register
* @param {User} request.body - email of the user
* @return  200 - success response - application/json 
* @example request - New user
* {
*     "firstname" : "Prénom",
*     "lastname" : "Nom",
*     "email" : "example1@domain.com",
*     "password": "Example1234",
*     "confirmPassword": "Example1234"
* }
*/
router.post('/login', authController.doLogin);

module.exports = router;

