/** *** */
/*  TAG */
/** *** */

const { Router } = require("express");
const tagController = require('../controllers/tagController');

const router = new Router();

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