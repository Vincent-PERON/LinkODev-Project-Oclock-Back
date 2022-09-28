const { Post } = require("../models");
const { getRandomIntroWithTag, 
        getRandomConclusionWithTag, 
        getRandomBodyWithTag,
        getRandomTag} = require("./tagController");

module.exports = {

    /**
     * Get all posts
     * @param {*} _ 
     * @param {*} res HTTP response from Express app
     */
    async getAllPosts(_, res) {
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
        res.json(latestPosts);
    },

    /**
     * Get a random post by Id
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
     */
     async getrandomPostById(req, res) {
        /* Get list of tags selected in front app */
        const tags = req.query.tag;
        let tagId;
        if (tags) { // If one tag or more, get a random tag of this array
            tagId = tags[Math.floor(Math.random()*tags.length)]
        } else { // else, take a random tag
            const tag = await getRandomTag(); 
            tagId = tag.id;
        };

        let postGenerated = [];
        /* Generate a random introduction */
        const randomIntro = await getRandomIntroWithTag(tagId);
        if (randomIntro) postGenerated.push(randomIntro.content); // if an introduction exists with this tag, add it to the post

        /* Generate a random body */        
        const randomBody = await getRandomBodyWithTag(tagId);
        if (randomBody) postGenerated.push(randomBody.content);

        /* Generate a random conclusion */
        const randomConclusion = await getRandomConclusionWithTag(tagId);
        if (randomConclusion) postGenerated.push(randomConclusion.content);

        postGenerated = postGenerated.join('\n');

        const randomPost = {
            introduction : randomIntro,
            body: randomBody,
            conclusion: randomConclusion,
            content : postGenerated
        }

        // A post contain introduction, body and conclusion
        /* Version with an object */
        /* postGenerated = {
            introduction : randomIntro?.content ?? "", 
            body: randomBody?.content ?? "",
            conclusion: randomConclusion?.content ?? "",
        }*/
        // (randomIntro?.content ?? "") is like : if (randomIntro && randomIntro.content) { return randomIntro.content } else { return "" };  
        
        res.json (randomPost);
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