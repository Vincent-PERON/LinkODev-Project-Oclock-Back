

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
        res.json("doLogin");
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