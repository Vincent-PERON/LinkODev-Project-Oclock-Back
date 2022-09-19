const express = require('express');
const router = express.Router();

// TODO : require les contrôleurs
// const listController = require('./controllers/listController');

// TODO : ajouter des routes

// récupérer tous le posts
router.get('/lists', listController.findAll);







module.exports = router; 