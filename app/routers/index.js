const { Router } = require("express");

const router = new Router();

/* Routers */
const userRouter = require('./user');
const authRouter = require('./auth');
const postRouter = require('./post');
const tagRouter = require('./tag');


// Doc API with express-jsdoc-swagger
const expressJSDocSwagger = require("express-jsdoc-swagger");
// doc : https://brikev.github.io/express-jsdoc-swagger-docs/#/

const options = require('./swagger-options.json');
options.baseDir = __dirname;

expressJSDocSwagger(router)(options);


// const serverApp = () => new Promise(resolve => {
//     instance.on('finish', data => {
//       init(data);
//       resolve(router);
//     });


/** ******* */
/*  ROUTERS */
/** ****** */

router.use(userRouter);
router.use(authRouter);
router.use(postRouter);
router.use(tagRouter);

module.exports = router; 