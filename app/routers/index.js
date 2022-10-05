const express = require('express');
const auth = require("./../middleware/authMiddleware");

const router = express.Router();

/* Controllers */ 
const tagController = require('../controllers/tagController');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const expressJSDocSwagger = require("express-jsdoc-swagger");
// doc : https://brikev.github.io/express-jsdoc-swagger-docs/#/

const options = {
  info: {
      version: "1.0.0",
      title: "API Linkodev",
      description: "REST API - Interface for Linkodev",
      license: {
          name: "MIT",
      },
  },
  security: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: 'JWT',
      }
      
  },
  swaggerUIPath: "/api-doc", // url où se trouve la doc
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: "./*.js",
};

expressJSDocSwagger(router)(options);



/** ************************* */
/*  SWAGGER (type definition)*/
/** ************************ */

/**
 * Schema of a tag
 * @typedef {object} Tag
 * @property {number} id.required - Id of the tag
 * @property {string} title - Title of the tag
 */

/**
 * Schema of an introduction
 * @typedef {object} Introduction
 * @property {number} id - Id of the introduction
 * @property {string} content - Content of the introduction
 */

/**
 * Schema of an introduction with tags
 * @typedef {object} IntroductionWithTags
 * @property {number} id - Id of the introduction
 * @property {string} content - Content of the introduction
 * @property {array<Tag>} tags - Array of the tags of the introduction
 */

/**
 * Schema of a body
 * @typedef {object} Body
 * @property {number} id - Id of the body
 * @property {string} content - Content of the body
 */

/**
 * Schema of a body
 * @typedef {object} BodyWithTags
 * @property {number} id - Id of the body
 * @property {string} content - Content of the body
 * @property {array<Tag>} tags - Array of the tags of the body
 */

/**
 * Schema of a conclusion
 * @typedef {object} Conclusion
 * @property {number} id - Id of the conclusion
 * @property {string} content - Content of the conclusion
 */

/**
 * Schema of a conclusion
 * @typedef {object} ConclusionWithTags
 * @property {number} id - Id of the conclusion
 * @property {string} content - Content of the conclusion
 * @property {array<Tag>} tags - Array of the tags of the conclusion
 */

/**
 * Schema of a post
 * @typedef {object} Post
 * @property {integer} id - Id of the post
 * @property {string} UpdatedAt - Updated date of the post
 * @property {Introduction} introduction - Introduction of the post
 * @property {Body} body - Body of the post
 * @property {Conclusion} conclusion - Conclusion of the post
 */

/**
 * Schema of a user
 * @typedef {object} User
 * @property {string} firstname - Firstname of the user
 * @property {string} lastname - Lastname of the user
 * @property {string} email - EMail of the user
 * @property {string} password - Password of the user
 */

/**
 * Schema of a userForm
 * @typedef {object} UserForm
 * @property {string} firstname - Firstname of the user
 * @property {string} lastname - Lastname of the user
 * @property {string} email - EMail of the user
 * @property {string} password - Password of the user
 * @property {string} confirmPassword - Password of the user
 */

/**
 * Schema of a body to add post
 * @typedef {object} BodyNewPost
 * @property {number} postId - id of the post to add
 * @property {number} introductionId - id of the introduction
 * @property {number} bodyId - id of the body
 * @property {number} conclusionId - id of the conclusion
 */

/**
 * Schema of a body to update user
 * newEmail, newPassword, confirmPassword, newFirstname, newLastname
 * @typedef {object} BodyUpdateUser
 * @property {string} email.required - email of the user
 * @property {string} password.required - password of the user
 * @property {UserForm} update - Fields to update for the user
 * 
 */

/** ******* */
/*  ROUTES */
/** ****** */

/** **** */
/*  AUTH */
/** **** */

/**
* POST /register
* @summary Validate form register 
* @tags Authentication / Register
* @param {UserForm} request.body - email of the user
* @return  200 - success response - application/json 
*/
router.post('/register', authController.doRegister);

/**
 * POST /login
 * @summary Validate form authentication 
 * @tags Authentication / Register
 * @param {User} request.body - email of the user
 * @return  200 - success response - application/json 
 */
router.post('/login', authController.doLogin);


/** **** */
/*  USER */
/** **** */

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
  * PATCH /me
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

  */
router.patch('/me', userController.updateUser);

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

/** ****** */
/*  -POST- */
/** ****** */

/**
* GET /posts
* @summary Get all posts
* @tags Post
* @return {array<Post>} 200 - success response - application/json 
*/
router.get('/posts', postController.getAllPosts);
 
/**
* GET /posts/latest
* @summary Get 3 latest posts
* @tags Post
* @return {array<Post>} 200 - success response - application/json 
*/
router.get('/posts/latest', postController.getLatestPosts);
 
/**
* GET /posts/random
* @summary Generate a random post with a specified tag
* @tags Post
* @param {array<integer>} tags.query - Array of tags to generate a random post
* @return { Post } 200 - success response - application/json 
*/  
router.get('/posts/random', postController.getrandomPostById);
  
/** *** */
/*  TAG */
/** *** */

/**
 * GET /tags
 * @summary Get all tags
 * @tags Tag
 * @return {array<Tag>} 200 - success response - application/json 
 */
router.get('/tags', tagController.getAllTags);


/**
 * //GET /tags/{idTag}/introduction
 * @summary Get a random introduction with the specified tag
 * @tags Tag
 * @param {number} idTag.path - Id of the tag
 * @return { Introduction} 200 - success response - application/json 
 */
// router.get('/tags/:idTag/introduction', tagController.getRandomIntroWithTag);

/**
 * //GET /tags/{idTag}/body
 * @summary Get a random body with the specified tag
 * @tags Tag
 * @param {number} idTag.path - Id of the tag
 * @return { Body } 200 - success response - application/json 
 */
//  router.get('/tags/:idTag/body', tagController.getRandomBodyWithTag);

/**
 * //GET /tags/{idTag}/conclusion
 * @summary Get a random conclusion with the specified tag
 * @tags Tag
 * @param {number} idTag.path - Id of the tag
 * @return { Conclusion } 200 - success response - application/json 
 */
//  router.get('/tags/:idTag/conclusion', tagController.getRandomConclusionWithTag);
 

module.exports = router; 