// librairies
const express = require('express');
require('dotenv').config();





// vars
const PORT = process.env.PORT || 5000


const app = express();


/* Routes */
// Page d'accueil du serveur : GET /
app.get('/', (req, res) => {
  console.log('>> GET /');
  res.sendFile( __dirname + '/index.html');
});
// On mettra notre code ICI



// on met le serveur en mode écoute pour entre les requêtes HTTP arriver
app.listen(PORT, () => {
  console.log(`Server OK - port ${PORT}`);
});