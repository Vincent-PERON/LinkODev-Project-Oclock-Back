const express = require('express');
const router = express.Router();

// TODO : require les contrôleurs
const tagController = require('../controllers/tagController')
// const listController = require('./controllers/listController');

// TODO : ajouter des routes
/**
 * A tag
 * @typedef {object} Tag
 * @property {number} id.required - Id of the tag
 * @property {string} title - Title of the tag
 */


/**
 * GET /tags
 * @summary Get all tags
 * @tags tag
 * @return {array<Tag>} 200 - success response - application/json 
 */
router.get('/tags', tagController.getAllTags);







module.exports = router; 