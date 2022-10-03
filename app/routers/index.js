const express = require('express');
const auth = require("./../middleware/authMiddleware");

const router = express.Router();

/* Controllers */ 
const tagController = require('../controllers/tagController');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const expressJSDocSwagger = require("express-jsdoc-swagger");

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
        BasicAuth: {
            type: "http",
            scheme: "basic",
        },
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


/**
 * GET /logout
 * @summary Logout a user ####### TODO #######
 * @tags Authentication / Register
 * @return  200 - success response - application/json 
 */
router.get('/logout', authController.doLogout);


/** **** */
/*  USER */
/** **** */

// All routes that begin with '/me' need a token
router.use('/me*',auth);

 /**
  * GET /me
  * @summary Get details of the user connected 
  * @tags User
  * @param {string} apitoken.header - JWT Token
  * @return {User} 200 - success response - application/json 
  */
router.get('/me', userController.getUser);

/**
  * PATCH /me
  * @summary Update details of the user connected ####### TODO #######
  * @tags User
  * @param {string} apitoken.header - JWT Token
  * @return {User} 200 - success response - application/json 
  */
router.patch('/me', userController.updateUser);

 /**
  * DELETE /me
  * @summary Delete the user connected 
  * @tags User
  * @param {string} apitoken.header - JWT Token
  * @return {User} 200 - success response - application/json 
  */
router.delete('/me', userController.deleteUser);

/**
  * GET /me/posts
  * @summary Get all posts of the user connected 
  * @tags User
  * @param {string} apitoken.header - JWT Token
  * @return {array<Post>} 200 - success response - application/json 
  */
router.get('/me/posts', userController.getAlluserPosts);

 /**
  * POST /me/posts
  * @summary Add post to the favorites of the user connected ####### TODO #######
  * @tags User
  * @param {string} apitoken.header - JWT Token
  * @return {User} 200 - success response - application/json 
  */
router.post('/me/posts', userController.addPost);

 /**
  * DELETE /me/posts/{postId}
  * @summary Delete one post of favorites ####### TODO #######
  * @tags User
  * @param {number} postId.path - Id of the post
  * @param {string} apitoken.header - JWT Token
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