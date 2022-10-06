
const { User } = require("../models");

/* JWT Token */
const jwt = require('jsonwebtoken');

/* Password and email Validator Module */
const bcrypt = require('bcrypt');
const assert = require('assert');
const validator = require('email-validator');
const passwordValidator = require('password-validator');

// Create a password schema
const schema = new passwordValidator();

// Add properties to it
schema
			    .is().min(8)                                    // Minimum length 8
			    .is().max(100)                                  // Maximum length 100
			    .has().uppercase()                              // Must have uppercase letters
			    .has().lowercase()                              // Must have lowercase letters
			    .has().digits(2)                                // Must have at least 2 digits
			    .has().not().spaces()                           // Should not have spaces
			    .is().not().oneOf(['Passw0rd', 'Password123','Azerty','azerty']); // Blacklist these values


module.exports = { 
    /**
     * Validate form register
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
    */
    async doRegister(req,res){
        // ETAPE 1 : Verification de l'intégrité des données
			
        try {
           
            // Check if firstname or lastname is empty
            assert.ok((req.body.firstname && req.body.lastname),'Vous devez renseigner votre nom et prénom');

            //  -> L'email est libre
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            /* Asserts
            ** We use "Assert" a Node's module wich say "If condition is false, I show an error)"
            */

            /*  -> Check if user is in Database */
            assert.ok(!Boolean(user),`L'utilisateur ${req.body.email} existe déjà`);  

            //  -> Email is valide (module "email-avlidator")
            assert.ok(validator.validate(req.body.email), `${req.body.email} n'est pas un email valide.`);  

            //  -> The 2 passwords (pwd + confim) are the same
            assert.ok(req.body.password === req.body.confirmPassword, `Les mots de passes ne correspondent pas`);
            
            //  -> Password respects the security rules (Schema)
            assert.ok(schema.validate(req.body.password), `Le mot de passe ne remplit pas les critères de sécurité`);

            // Password Hash (We use bcrypt module to hash password, )
            const encryptedPwd = await bcrypt.hash(req.body.password, 10);  

            // If all conditions are OK, create user in Database
            const createUser = await User.create({
            ...req.body,   
                password: encryptedPwd  
                });

            // After Create user return a message successfull
            return res.status(201).json({status : `Inscription réussie !`});

        } catch (err) {
            console.error(err);
            return res.status(400).json({error : `${err.message}`});
        }
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
                return res.status(400).json({error: "Email or password is incorrect."});
            }

            /* 3. Si l'email est connue en BDD on compare le mdp envoyé avec le mdp en BDD */
            const validPassword = await bcrypt.compare(req.body.password, foundUser.password); 
            
            /* 4. Si le mdp ne correspond pas, on revoie un message d'erreur */
            if (!validPassword) {   
                return res.status(400).json({error: "Email or password is incorrect."});  
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
            
                const user= foundUser.firstname;

             /* 6. On envoie au client le JWT  */
            return res.json({ accessToken, user });

            /* Si probleme connexion avec la BDD */
            } catch (error) {
                res.status(500).json({error: "Internal Server Error (Login)"});
                console.error(error);
            }
    },
}