require('dotenv').config();

// librairies
const express = require('express');

// CORS Library
const cors = require('cors');

// Routers
const router = require("./app/routers");

// vars
const PORT = process.env.PORT || 5000

// Init express server
const app = express();

/* Routes */
// Page d'accueil du serveur
app.get('/', (req, res) => {
  console.log('>>  /');
  res.sendFile( __dirname + '/index.html');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CORS_ORIGINS || '*',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions)); 

app.use(router);


// on met le serveur en mode écoute pour entre les requêtes HTTP arriver
app.listen(PORT, () => {
console.log(`Server OK - port ${PORT}`);
});