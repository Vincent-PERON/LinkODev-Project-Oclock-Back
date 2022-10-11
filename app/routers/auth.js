/** **** */
/*  AUTH */
/** **** */
const { Router } = require("express");

const router = new Router();

/* Middleware to validate the body of requests */ 
const {validateBody} = require('../middleware/validation/validation.js');
// Schemas definition
const schemas = require("../middleware/validation/schemas");


// Controllers called by routes
const authController = require('../controllers/authController');


/**
* POST /register
* @summary Validate form register 
* @tags Authentication / Register
* @param {userForm} request.body.required - Fields required to create a new user
* @return  {successResponse} 201 - success response, user created - application/json 
* @return  {badResponse} 400 - Bad request - application/json
* @example request - New user
* {
*     "firstname" : "Prénom",
*     "lastname" : "Nom",
*     "email" : "example1@domain.com",
*     "password": "Example1234",
*     "confirmPassword": "Example1234"
* }
* @example response - 201 - New user
* {
*   "status": "Inscription réussie !"
* }
*/
router.post('/register', validateBody(schemas.userForm), authController.doRegister);

/**
* POST /login
* @summary Validate form authentication 
* @tags Authentication / Register
* @param {loginForm} request.body.required - Fields required to login
* @return  {loginResponse} 200 - success response, user connected - application/json 
* @return  {badResponse} 400 - Bad request - application/json
* @example request - User example
* {
*     "email" : "example1@domain.com",
*     "password": "Example1234"
* }
* @example response - 200 - User connected
* {
*   "accesstoken": "JWT.necessaire.pour.l.authentification",
*   "user": "Prénom"
* }
*/
router.post('/login', validateBody(schemas.loginForm), authController.doLogin);

module.exports = router;

