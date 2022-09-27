// librairies
const express = require('express');
require('dotenv').config();

// Sessions
const session = require('express-session'); 

// Routers
const router = require("./app/routers");

// vars
const PORT = process.env.PORT || 5000

// Init express server
const app = express();

/* Sessions */
app.use(session({
    saveUninitialized: true, 
    resave: true, 
    secret: process.env.SESSION_SECRET || 'Change Me!'      // la clé "secret" est gérée dans le .env  si le secret n'est pas defini ce sera "change Me" qui sera utilisé
}));

/* Routes */
// Page d'accueil du serveur
app.get('/', (req, res) => {
  console.log('>>  /');
  res.sendFile( __dirname + '/index.html');
});


app.use(router);
app.use(express.urlencoded({ extended: true }));
		
// ******************* AUTH **************************** //
// router.get('/signup', userController.showSignUp);   
// router.post('/signup', userController.doSignUp);	// traiter le formulaire d'inscription,	
// router.get('/login', userController.showLogin);   // d'afficher le formulaire de connexion
// router.post('/login', userController.doLogin);   // se connecter 



// on met le serveur en mode écoute pour entre les requêtes HTTP arriver
app.listen(PORT, () => {
console.log(`Server OK - port ${PORT}`);
});