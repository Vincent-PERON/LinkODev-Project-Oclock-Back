const { Post } = require("../models");

module.exports = {

    /**
     * Get all posts
     * @param {*} _ 
     * @param {*} res HTTP response from Express app
     */
    async getAllPosts(_, res) {
        const posts = await Post.findAll({
            include: [
                'introduction',   
                'body', 
                'conclusion'
                    ],
            
        });
        res.json(posts);
    },

    /**
     * Get all 3 latest posts
     * @param {*} _ 
     * @param {*} res HTTP response from Express app
     */
    async getLastestPosts(_, res) {
        const lastestPosts = await Post.findAll({
            limit: 3, 
            include: [
                'introduction',   
                'body', 
                'conclusion',
                    ],
            order: [
                ['updatedAt', 'DESC'],
                ],
            // attributes: { exclude: ['createdAt', 'updatedAt'] }
            attributes : ['id','title','updatedAt']
            
        });
        res.json(posts);
    },

    /**
     * Delete a post by id
     * @param {*} _ 
     * @param {*} res HTTP response from Express app
     */
    async deletePost(req, res) {
        const post = await Post.findByPk(req.params.id, )
        },

}