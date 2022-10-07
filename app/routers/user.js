/** **** */
/*  USER */
/** **** */
const { Router } = require("express");
const userController = require('../controllers/userController');

// Middleware auth for JWT authorization
const auth = require("./../middleware/authMiddleware");

const router = new Router();

// All routes that begin with '/me' need a token
router.use('/me*',auth);

 /**
  * GET /me
  * @summary Get details of the user connected
  * @tags User
  * @security BearerAuth
  * @return {User} 200 - success response - application/json 
  */
router.get('/me', userController.getUser);

/**
  * PUT /me
  * @summary Update details of the user connected
  * @tags User
  * @security BearerAuth
  * @param {BodyUpdateUser} request.body - Body request
  * @return {string} 200 - success response - application/json 
  * @example request - All
  * {
  *   "email" : "example1@domain.com",
  *   "password" : "Example1234",
  *   "update": {
  *     "firstname" : "Prénom",
  *     "lastname" : "Nom",
  *     "email" : "example2@domain.com",
  *     "password": "Example12345",
  *     "confirmPassword": "Example12345"
  *   }
  * }
  * @example request - New email
  * {
  *   "email" : "example1@domain.com",
  *   "password" : "Example1234",
  *   "update": {"email": "example2@domain.com"}
  * }
  * @example request - New password
  * {
  *   "email" : "example1@domain.com",
  *   "password" : "Example1234",
  *   "update": {
  *     "password": "Example12345",
  *     "confirmPassword": "Example12345"
  *   }
  * }
  * @example request - New name
  * {
  *   "email" : "example1@domain.com",
  *   "password" : "Example1234",
  *   "update": {
  *     "firstname" : "Prénom",
  *     "lastname" : "Nom"
  *   }
  * }
  * 
  */
router.put('/me', userController.updateUser);

 /**
  * DELETE /me
  * @summary Delete the user connected
  * @tags User
  * @security BearerAuth
  * @return {User} 200 - success response - application/json 
  */
router.delete('/me', userController.deleteUser);

/**
  * GET /me/posts
  * @summary Get all posts of the user connected
  * @tags User
  * @security BearerAuth
  * @return {array<Post>} 200 - success response - application/json 
  */
router.get('/me/posts', userController.getAlluserPosts);

 /**
  * POST /me/posts
  * @summary Add post to the favorites of the user connected
  * @tags User
  * @security BearerAuth
  * @param {BodyNewPost} request.body - Body of the post request to add a new post to an user
  * @return {BodyNewPost} 200 - success response - application/json 
  */
router.post('/me/posts', userController.addPost);

 /**
  * DELETE /me/posts/{postId}
  * @summary Delete one post of favorites
  * @tags User
  * @param {number} postId.path - Id of the post
  * @security BearerAuth
  * @return {Post} 200 - success response - application/json 
  */
router.delete('/me/posts/:postId', userController.deletePost);

module.exports = router;
