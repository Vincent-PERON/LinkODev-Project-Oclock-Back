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

/** ******* */
/*  ROUTERS */
/** ****** */

router.use(authRouter);
router.use('/me',userRouter);
router.use('/posts',postRouter);
router.use('/tags',tagRouter);
router.use('*',(req,res) => res.status(404).json({error:"Route indéterminée"}));

module.exports = router; 