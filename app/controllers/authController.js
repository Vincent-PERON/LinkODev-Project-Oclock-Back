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

            // user exists, test the password
            const validPassword = foundUser.password === req.body.password; // TODO : use bcrypt or similar

            // if password incorrect, send a message
            if (!validPassword) {
                return res.status(401).json({error: "Email or password is incorrect."});
            }
            res.json(foundUser);
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