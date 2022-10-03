

module.exports = { 
    /**
     * Get details of one user ####### TODO #######
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
     */
    async getUser(req,res){
        res.json(req.user);
    },

    /**
     * Update details of one user ####### TODO #######
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
    */
    async updateUser(req,res){
        res.json("updateUser");
    },

    /**
     * Delete one user ####### TODO #######
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
     */
    async deleteUser(req,res){
        res.json("deleteUser");
    },

    /**
     * Get all posts of one user ####### TODO #######      
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
    */
    async getAllPosts(req,res){
        // 1 je recupere l'id de l'utiliseur 
        // 2 faire requete axios 
        res.json("getAllPosts");
    },

    /** Add post to favorites ####### TODO #######
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
    */
    async addPost(req,res){
        res.json("addPost");
    },

    /**
     * Delete one post of favorites ####### TODO #######
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
     */
        async deletePost(req,res){
            res.json("deletePost");
        }
}