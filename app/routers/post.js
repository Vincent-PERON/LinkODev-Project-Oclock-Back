/** ****** */
/*  -POST- */
/** ****** */
const { Router } = require("express");
const router = new Router();

// Schemas definition
const schemas = require("../middleware/validation/schemas");

const postController = require('../controllers/postController');

/**
* GET /posts
* @summary Get all posts
* @tags Post
* @return {array<Post>} 200 - success response, array of posts - application/json 
*/
router.get('/', postController.getAllPosts);


/**
* GET /posts/latest
* @summary Get 3 latest posts
* @tags Post
* @return {array<Post>} 200 - success response, array of the 3 latest posts - application/json 
*/
router.get('/latest', postController.getLatestPosts);


/**
* GET /posts/random
* @summary Generate a random post with a specified tag
* @tags Post
* @param {array<integer>} tags.query - Array of tags to generate a random post
* @return { PostWithTags } 200 - success response, random post - application/json 
*/  
router.get('/random', postController.getrandomPostById);

module.exports = router;