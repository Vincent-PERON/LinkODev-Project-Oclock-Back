const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { User, RefreshToken } = require("../models");
const jwt = require('jsonwebtoken');


module.exports = { 
    /**
     * Validate form register ####### TODO #######
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
    */
     async doRegister(req,res){
        res.json("doRegister");
    },

    /** 
     * Validate form authentication ####### TODO #######
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
    */
    async doLogin(req,res){
        try {
            /* 1. On cherche l'utilisateur en bdd via son email */
            console.log(req.body)
            const foundUser = await User.findOne(
                {
                    where : {
                        email: req.body.email
                    }
                }
            );

            /* 2. Si l'utilisateur est introuvable on renvoie une ereur */
            if (!foundUser) {
                return res.status(401).json({error: "Email or password is incorrect."});
            }

            /* 3. Si l'email est connue en BDD on compare le mdp envoyé avec le mdp en BDD */
            const validPassword = await bcrypt.compare(req.body.password, foundUser.password); 
            
            /* 4. Si le mdp ne correspond pas, on revoie un message d'erreur */
            if (!validPassword) {   
                return res.status(401).json({error: "Email or password is incorrect."});  
            }
            
            /* 4.1 Si le mot de passe correspond, on passe à la suite ....

            /* 5. On créer le token JWT */
            const accessToken = jwt.sign(
                { firstName: foundUser.firstname, lastName: foundUser.lastname },
                    process.env.ACCESS_TOKEN_SECRET,
                {
                  algorithm: process.env.ACCESS_TOKEN_ALGORITHM,
                  expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN, // 
                  subject: foundUser.id.toString()
                }
              );

             /* 6. On envoie au client le JWT  */
            return res.json({ accessToken });

            /* Si probleme connexion avec la BDD */
            } catch (error) {
                 res.status(500).json({error: "Internal Server Error (Login)"});
                 console.error(error);
            }
    },

    /**
     * Logout a user ####### TODO #######
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
    */
    async doLogout(req,res){
        res.json("doLogout");
    }
}