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


/* OPTION WITH MULTIPLE ORIGINS 
var whitelist = process.env.CORS_ORIGINS?.split(',').map(origin => origin.trim()) || '*';
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
*/

console.log(corsOptions);
app.use(cors(corsOptions)); 

app.use(router);
// app.use('*',(req,res) => res.json({error:"404-Where are you?"}));


// on met le serveur en mode écoute pour entre les requêtes HTTP arriver
app.listen(PORT, () => {
console.log(`Server OK - port ${PORT}`);
});