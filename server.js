// librairies
const express = require('express');
require('dotenv').config();

// Routers
const router = require("./app/routers");


// vars
const PORT = process.env.PORT || 5000

// Init express server
const app = express();

/** *************** */
/*  SWAGGER (begin)*/
/** ************** */
const expressJSDocSwagger = require("express-jsdoc-swagger");

const options = {
    info: {
        version: "1.0.0",
        title: "API Linkodev",
        description: "REST API - Interface for Linkodev",
        license: {
            name: "MIT",
        },
    },
    security: {
        BasicAuth: {
            type: "http",
            scheme: "basic",
        },
    },
    swaggerUIPath: "/api-doc", // url où se trouve la doc
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: "./**/*.js",
};

expressJSDocSwagger(app)(options);

/** ************* */
/*  SWAGGER (end)*/
/** ************ */

// /* Routes */
// // Page d'accueil du serveur
// app.get('/', (req, res) => {
//   console.log('>>  /');
//   res.sendFile( __dirname + '/index.html');
// });

app.use(router);



// on met le serveur en mode écoute pour entre les requêtes HTTP arriver
app.listen(PORT, () => {
  console.log(`Server OK - port ${PORT}`);
});