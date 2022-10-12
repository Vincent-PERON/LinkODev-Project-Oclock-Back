const { User } = require("../models");
const assert = require('assert');


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

            /* Step 1 
            ** Check if firstname or lastname is empty
            ** Verifications are in the User model
            */

            /* Step 2
            ** Email already used ?
            */
            const user = await User.findOne({
                where: {
                    email: userForm.email
                }
            });
            assert.ok(!Boolean(user),`L'utilisateur ${req.body.email} existe déjà`);            

            /* Step 3
            ** Email is valide ?
            ** Verifications are in the User model
            */
            
            /* Step 4
            ** The 2 passwords (pwd + confim) are the same
            */
            assert.ok(userForm.password === userForm.confirmPassword, `Les mots de passes ne correspondent pas`);
            
            /* Step 5
            ** Password respects the security rules
            ** Verifications are in the User model
            */

            /* Step 6
            ** If all conditions are OK, create user in Database
            ** Verifications are in the User model
            */
            // NB : password is hashed with bcrypt in the User model
            const createUser = await User.create(userForm);


            // After Create user return a successfull message
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
            const accessToken = foundUser.getJWT();  // getJWT is a method of the User model 
            const user= foundUser.firstname; // return also the firstname to display a personnal message

             /* 6. Send token and firstname  */
            res.json({ accessToken, user });

        /* If error ... */
        } catch (err) {
            return res.status(400).json({error : `${err.message}`});
        }
    },
}