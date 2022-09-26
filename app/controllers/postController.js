const { Post } = require("../models");
const { getRandomIntroWithTag, 
        getRandomConclusionWithTag, 
        getRandomBodyWithTag} = require("./tagController");

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
    async getLatestPosts(_, res) {
        const latestPosts = await Post.findAll({
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
        res.json(latestPosts);
    },

    /**
     * Get a random post by Id
     * @param {*} _ 
     * @param {*} res HTTP response from Express app
     */
     async getrandomPostById(req, res) {
        /* Generate a random introduction */
        const randomIntro = await getRandomIntroWithTag(req,res);
        const randIntro = Object.values(randomIntro)[0];
        /* Generate a random body */        
        const randomBody = await getRandomBodyWithTag(req,res);
        const randBody = Object.values(randomBody)[0]; 
        /* Generate a random conclusion */
        const randomConclusion = await getRandomConclusionWithTag(req,res);
        const randConclu = Object.values(randomConclusion)[0]; 

        /* A post contain introduction, body and conclusion */
        const postGenerated = {
            introduction : randIntro.content,
            body: randBody.content ,
            conclusion: randConclu.content
        };
        res.json (postGenerated);
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