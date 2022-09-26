const express = require('express');
const router = express.Router();

// TODO : require les contrôleurs
const tagController = require('../controllers/tagController');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


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
 * @property {number} id.required - Id of the introduction
 * @property {string} content - Content of the introduction
 * @property {array<Tag>} tags - Array of the tags of the introduction
 */

/**
 * Schema of a body
 * @typedef {object} Body
 * @property {number} id.required - Id of the body
 * @property {string} content - Content of the body
 * @property {array<Tag>} tags - Array of the tags of the body
 */

/**
 * Schema of a conclusion
 * @typedef {object} Conclusion
 * @property {number} id.required - Id of the conclusion
 * @property {string} content - Content of the conclusion
 * @property {array<Tag>} tags - Array of the tags of the conclusion
 */

/**
 * Schema of a post
 * @typedef {object} Post
 * @property {string} introduction - Introduction of the post
 * @property {string} body - Body of the post
 * @property {string} conclusion - Conclusion of the post
 */

/**
 * Schema of a user
 * @typedef {object} User
 * @property {string} firstname - Firstname of the user
 * @property {string} lastname - Lastname of the user
 * @property {string} email - EMail of the user
 * @property {string} password - Password of the user
 */


/** ******* */
/*  ROUTES */
/** ****** */

/** **** */
/*  AUTH */
/** **** */

/**
* POST /register
* @summary Validate form register ####### TODO #######
* @tags Authentication / Register
* @return  200 - success response - application/json 
*/
router.post('/register', authController.doRegister);

/**
 * POST /login
 * @summary Validate form authentication ####### TODO #######
 * @tags Authentication / Register
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

 /**
  * GET /users/{id}
  * @summary Get details of one user ####### TODO #######
  * @tags User
  * @param {number} id.path - Id of the user
  * @return {User} 200 - success response - application/json 
  */
router.get('/users/:id', userController.getUser);

/**
  * PATCH /users/{id}
  * @summary Update details of one user ####### TODO #######
  * @tags User
  * @param {number} id.path - Id of the user
  * @return {User} 200 - success response - application/json 
  */
router.patch('/users/:id', userController.updateUser);

 /**
  * DELETE /users/{id}
  * @summary Delete one user ####### TODO #######
  * @tags User
  * @param {number} id.path - Id of the user
  * @return {User} 200 - success response - application/json 
  */
router.delete('/users/:id', userController.deleteUser);

/**
  * GET /users/{id}/posts
  * @summary Get all posts of one user ####### TODO #######
  * @tags User
  * @param {number} id.path - Id of the user
  * @return {array<Post>} 200 - success response - application/json 
  */
router.get('/users/:id/posts', userController.getAllPosts);

 /**
  * POST /users/{id}/posts
  * @summary Add post to favorites ####### TODO #######
  * @tags User
  * @param {number} id.path - Id of the user
  * @return {User} 200 - success response - application/json 
  */
router.post('/users/:id/posts', userController.addPost);

 /**
  * DELETE /users/{userId}/posts/{postId}
  * @summary Delete one post of favorites ####### TODO #######
  * @tags User
  * @param {number} userId.path - Id of the user
  * @param {number} postId.path - Id of the post
  * @return {Post} 200 - success response - application/json 
  */
router.delete('/users/:userId/posts/:postId', userController.deletePost);

/** ****** */
/*  -POST- */
/** ****** */

/**
* GET /posts
* @summary Get all posts
* @tags Post
* @return {array<Tag>} 200 - success response - application/json 
*/
router.get('/posts', postController.getAllPosts);
 
/**
* GET /posts/latest
* @summary Get 3 latest posts
* @tags Post
* @return {array<Tag>} 200 - success response - application/json 
*/
router.get('/posts/latest', postController.getLatestPosts);
 
/**
* GET /posts/tags/{idTag}/
* @summary Generate a random post with the specified tag
* @tags Post
* @param {number} idTag.path - Id of the tag
* @return { Post } 200 - success response - application/json 
*/  
router.get('/posts/tags/:idTag/', postController.getrandomPostById);
  
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