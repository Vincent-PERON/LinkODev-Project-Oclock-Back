const { User } = require("../models");

/* Password and email Validator Module */
const assert = require('assert');
// const validator = require('email-validator');

/* Now, password schema is defined in the User model definition
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
*/

module.exports = { 
    /**
     * Validate form register
     * @param {object} req HTTP request to Express app
     * @param {object} res HTTP response from Express app
     * @return {object} Response with JSON 
     * 
    */
    async doRegister(req,res){

        // Params required to register a new user : firstname, lastname, email, password, confirmPassword
        // It's validated by the validateBody function of the middleware validation with the schema userForm.
        const userForm = req.body;
			
        try {
            /* Asserts
            ** We use "Assert" a Node's module wich say "If condition is false, I show an error)"
            */

            // Check if firstname or lastname is empty. Now, not neccesary because it's in the User model definition.
            // assert.ok((userForm.firstname && userForm.lastname),'Vous devez renseigner votre nom et prénom');

            // Email already used ? Unique constraint is defined in the User model defition but 
            const user = await User.findOne({
                where: {
                    email: userForm.email
                }
            });
            assert.ok(!Boolean(user),`L'utilisateur ${req.body.email} existe déjà`);            

            //  -> Email is valide (module "email-avlidator"). Now, not neccesary because it's in the User model definition.
            // assert.ok(validator.validate(userForm.email), `${userForm.email} n'est pas un email valide.`);  

            //  -> The 2 passwords (pwd + confim) are the same
            assert.ok(userForm.password === userForm.confirmPassword, `Les mots de passes ne correspondent pas`);
            
            //  -> Password respects the security rules (Schema). Now, not neccesary because it's in the User model definition.
            // assert.ok(schema.validate(userForm.password), `Le mot de passe ne remplit pas les critères de sécurité`);

            // If all conditions are OK, create user in Database
            // note : password is hashed with bcrypt in the User model
            const createUser = await User.create(userForm);
            // console.log(createUser.errors[0].message);

            // After Create user return a message successfull
            return res.status(201).json({status : `Inscription réussie !`});

        } catch (err) {
            return res.status(400).json({error : `${err.message}`});
        }
    },


    /**
     * Validate form login
     * @param {object} req HTTP request to Express app
     * @param {object} res HTTP response from Express app
     * @return {object} Response with JSON 
     * 
    */
    async doLogin(req,res){
        try {
            // Params required in the body of the request to login
            // It's validated by the validateBody function of the middleware validation with the schema userLogin.
            const {email, password} = req.body;

            // 1. Get the user in the BDD from his email
            const foundUser = await User.findOne(
                {
                    where : {
                        email: email
                    }
                }
            );

            /* 2. Test if user exists */
            if (!foundUser) {
                return res.status(400).json({error: "Email ou mot de passe incorrect."});
            }

            /* 3. If the user exsists, check if the password is correct */
            const validPassword = await foundUser.checkPassword(password); // checkPassword is a method of the User model 
            
            /* 4. Return error if the password is incorrect */
            if (!validPassword) {   
                return res.status(400).json({error: "Email ou mot de passe incorrect."});  
            }
            
            /* 5. If user password is correct, generate JWT */
            const accessToken = foundUser.getJWT();
            const user= foundUser.firstname; // return also the firstname to display a personnal message

             /* 6. Send token and firstname  */
            res.json({ accessToken, user });

        /* If error ... */
        } catch (err) {
            return res.status(400).json({error : `${err.message}`});
        }
    },
}