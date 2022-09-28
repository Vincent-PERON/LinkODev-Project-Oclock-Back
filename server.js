// librairies
const express = require('express');
require('dotenv').config();

//CORS
const cors = require('cors');

// Sessions
const session = require('express-session'); 

// Routers
const router = require("./app/routers");

// vars
const PORT = process.env.PORT || 5000

// Init express server
const app = express();

// CORS
// const corsOptions = {
//   origin: ['<http://linkodevapi.cyber-one.fr/>','<http://localhost:5050>'], // autorise des domaines
//   optionsSuccessStatus: 200 // For legacy browser support
// }
// app.use(cors(corsOptions));
/* WARNING : OPEN TO EVERYBODY */
app.use(cors()); // Autorise toutes les requêtes CORS

/* Sessions */
app.use(session({
    saveUninitialized: true, 
    resave: true, 
    secret: process.env.SESSION_SECRET || 'Change Me!'      // la clé "secret" est gérée dans le .env  si le secret n'est pas defini ce sera "change Me" qui sera utilisé
}));

/* Routes */
// Server home page
app.get('/', (req, res) => {
  console.log('>>  /');
  res.sendFile( __dirname + '/index.html');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

		
// ******************* AUTH **************************** //
// router.get('/signup', userController.showSignUp);   
// router.post('/signup', userController.doSignUp);	// traiter le formulaire d'inscription,	
// router.get('/login', userController.showLogin);   // d'afficher le formulaire de connexion
// router.post('/login', userController.doLogin);   // se connecter 



// on met le serveur en mode écoute pour entre les requêtes HTTP arriver
app.listen(PORT, () => {
console.log(`Server OK - port ${PORT}`);
});