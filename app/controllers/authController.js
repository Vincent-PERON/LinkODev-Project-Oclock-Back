const bcrypt = require('bcrypt');
const { User } = require("../models");


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
            // find user
            console.log(req.body)
            const foundUser = await User.findOne(
                {
                    where : {
                        email: req.body.email
                    }
                }
            );
            // if user not found, send a message
            if (!foundUser) {
                return res.status(401).json({error: "Email or password is incorrect."});
            }

            // if user exists, Password verification
            //const passw = await bcrypt.hash("estelle1234", 10);
            //console.log(passw);

            const validPassword = await bcrypt.compare(req.body.password, foundUser.password); 
            
            // if password is ok
            if (validPassword) {     
                // req.session.user = user;  // ON STOCK LE USER DANS LA SESSION
                // delete req.session.user.password;   // on n'a ps besoin de stocker le mdp, on le supprime donc
                res.json({name:foundUser.fullName});
                

            // if password is incorrect, send a message
            } else {   
                return res.status(401).json({error: "Email or password is incorrect."});  
        }
        } catch (error) {
            res.status(500).json({error: "Internal Server Error (Login)"});
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