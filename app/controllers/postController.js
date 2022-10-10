const { Post } = require("../models");
const { getRandomIntroWithTag, 
        getRandomConclusionWithTag, 
        getRandomBodyWithTag,
        getRandomTag} = require("./tagController");

module.exports = {

    /**
     * Get all posts
     * @param {object} _ HTTP request from Express app - NOT USED
     * @param {object} res HTTP response from Express app
     * @return {object} Response with JSON 
     */
    async getAllPosts(_, res) {
        try {
            const posts = await Post.findAll({
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
                attributes: ['id','updatedAt']
            });
            // let postsArray = [];
            // posts.forEach(post => post.content = post.introduction.content + post.body.content + post.conclusion.content );
            // console.log(posts);
            return res.json(posts);
        } catch (err) {
            return res.status(500).json({error : `${err.message}`});
        }
    },

    /**
     * Get all 3 latest posts
     * @param {*} _ 
     * @param {*} res HTTP response from Express app
     * @return {object} Response with JSON 
     */
    async getLatestPosts(_, res) {
        try{
            const latestPosts = await Post.findAll({
                limit: 3, 
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
                order: [
                    ['updatedAt', 'DESC'],
                    ],
                // attributes: { exclude: ['createdAt', 'updatedAt'] }
                attributes : ['id','updatedAt']
                
            });
            return res.json(latestPosts);
        } catch (err) {
            return res.status(500).json({error : `${err.message}`});
        }
    },

    /**
     * Get a random post by Id
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
     * @return {object} Response with JSON 
     */
     async getrandomPostById(req, res) {
        try {
            let tagId;
            /* Get list of tags selected in front app*/
            let tags = req.query.tags;

            // if the format of tags is not a object, convert it (array is an object in js)
            if (tags && typeof(tags) !== 'object') tags = JSON.parse(tags);

            // If tags is a number, take its id
            if (Number.isInteger(tags)) tagId = tags;
            // If tags is an array with one tag or more tags, get a random tag of this array
            else if (tags && tags.length > 0) tagId = parseInt(tags[Math.floor(Math.random()*tags.length)],10);  
            // else, take a random tag       
            else { 
                const tag = await getRandomTag(); 
                tagId = tag.id;
            };

            // Create post content
            let postContent = [];

            /* Generate a random introduction */
            const randomIntro = await getRandomIntroWithTag(tagId);
            if (randomIntro) postContent.push(randomIntro.content); // if an introduction exists with this tag, add it to the post

            /* Generate a random body */        
            const randomBody = await getRandomBodyWithTag(tagId);
            if (randomBody) postContent.push(randomBody.content);

            /* Generate a random conclusion */
            const randomConclusion = await getRandomConclusionWithTag(tagId);
            if (randomConclusion) postContent.push(randomConclusion.content);

            /* post content = intro content + \n + body content + \n + conclusion content */
            postContent = postContent.join('\n');

            const randomPost = {
                introduction : randomIntro,
                body: randomBody,
                conclusion: randomConclusion,
                content : postContent
            }

            return res.json (randomPost);

        } catch (err) {
            return res.status(500).json({error : `${err.message}`});
        }  
    },
}