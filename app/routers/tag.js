/** *** */
/*  TAG */
/** *** */
const { Router } = require("express");
const tagController = require('../controllers/tagController');

// Schemas definition
const schemas = require("../middleware/validation/schemas");

const router = new Router();

/**
 * GET /tags
 * @summary Get all tags
 * @tags Tag
 * @return {array<Tag>} 200 - success response - application/json 
 */
 router.get('/', tagController.getAllTags);


 module.exports = router;