const { User, Post } = require("../models");

module.exports = { 
    /**
     * Get details of one user ####### TODO #######
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
     */
    async getUser(req,res){
        const foundUser = await User.findOne(
            {   
                attributes: ['email'],
                where : {
                    id: req.user.sub
                }
            }
        );
        res.json(foundUser);
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
    async getAlluserPosts(req,res){
        const userId = parseInt(req.user.sub);
        const userPosts = await User.findByPk(userId, {
            attributes: ['id','firstname','lastname'],
            include: [
                {
                    association: 'posts',
                    include: [
                        {
                            association: 'introduction',
                            attributes: ['id','content']
                        },
                        {
                            association: 'body',
                            attributes: ['id','content']
                        },
                        {
                            association: 'conclusion',
                            attributes: ['id','content']
                        },
                    ],
                    attributes: ['id','updatedAt'],
                    through: {
                        attributes: [] // To don't return the through table attributes
                    },
                },
        ] 

        });
        res.json(userPosts);
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