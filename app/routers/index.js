const express = require('express');
const router = express.Router();

// TODO : require les contrôleurs
const tagController = require('../controllers/tagController')
const postController = require('../controllers/postController')
// const listController = require('./controllers/listController');

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

/** ******* */
/*  ROUTES */
/** ****** */
// TODO : ajouter des routes
/**
 * GET /tags
 * @summary Get all tags
 * @tags tag
 * @return {array<Tag>} 200 - success response - application/json 
 */
router.get('/tags', tagController.getAllTags);


/**
 * GET /tags/{idTag}/introduction
 * @summary Get a random introduction with the specified tag
 * @tags tag
 * @param {number} idTag.path - Id of the tag
 * @return { Introduction} 200 - success response - application/json 
 */
router.get('/tags/:idTag/introduction', tagController.getRandomIntroWithTag);

/**
 * GET /tags/{idTag}/body
 * @summary Get a random body with the specified tag
 * @tags tag
 * @param {number} idTag.path - Id of the tag
 * @return { Body } 200 - success response - application/json 
 */
 router.get('/tags/:idTag/body', tagController.getRandomBodyWithTag);

/**
 * GET /tags/{idTag}/conclusion
 * @summary Get a random conclusion with the specified tag
 * @tags tag
 * @param {number} idTag.path - Id of the tag
 * @return { Conclusion } 200 - success response - application/json 
 */
 router.get('/tags/:idTag/conclusion', tagController.getRandomConclusionWithTag);
 
 /**
  * GET /posts
  * @summary Get all posts
  * @tags post
  * @return {array<Tag>} 200 - success response - application/json 
  */
 router.get('/posts', postController.getAllPosts);
 
 /**
  * GET /posts/latest
  * @summary Get 3 latest posts
  * @tags post
  * @return {array<Tag>} 200 - success response - application/json 
  */
  router.get('/posts/latest', postController.getLastestPosts);

 /**
 * GET /post/tags/{idTag}/
 * @summary Generate a random post with the specified tag
 * @tags post
 * @param {number} idTag.path - Id of the tag
 * @return { Post } 200 - success response - application/json 
 */  
 router.get('/post/tags/:idTag/', postController.getrandomPostById);

 


 

module.exports = router; 