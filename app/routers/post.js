/** ****** */
/*  -POST- */
/** ****** */
const { Router } = require("express");
const router = new Router();

const postController = require('../controllers/postController');

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

module.exports = router;