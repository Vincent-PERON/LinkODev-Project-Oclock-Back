const { Sequelize } = require("sequelize");
const { Tag, Introduction, Body, Conclusion } = require("../models");

module.exports = {

    /**
     * Get all tags
     * @param {*} _ 
     * @param {*} res HTTP response from Express app
     */
    async getAllTags(_, res) {
        const tags = await Tag.findAll();
        res.json(tags);
    },

    /**
     * Get a random introduction with a specific tag
     * @param {integer} tagId id of the tag
     * @returns {Introduction} Random introduction with the tag id
     */
    async getRandomIntroWithTag(tagId) {
        // TODO : See how we can have all tags of an introduction, not just the tag with specified id
        const intro = await Introduction.findOne({
            attributes: ['id','content'], // If we just want content instead of all columns
            include: [{
                association: 'tags', // add tags linked to the introduction
                attributes: ['id','title'], // return some attributes of the tags
                through: {
                    attributes: [] // To don't return the through table attributes
                  },
                where: {
                    'id': tagId, // to get only one introduction with the id tag specified
                },
            }],

            order: [
                Sequelize.fn('RANDOM'), // to order randomly in Postgres (we use findOne function, then we don't need to add option limit:1)
            ]
        });

        return (intro);
    },

    /**
     * Get a random body with a specific tag
     * @param {integer} tagId id of the tag
     * @returns {Body} Random body with the tag id
     */
     async getRandomBodyWithTag(tagId) {
        const body = await Body.findOne({
            attributes: ['id','content'], // If we just want content instead of all columns
            include: [{
                association: 'tags', // add tags linked to the body
                attributes: ['id','title'], // return some attributes of the tags
                through: {
                    attributes: [] // To don't return the through table attributes
                  },
                where: {
                    'id': tagId, // to get only one body with the id tag specified
                },
            }],

            order: [
                Sequelize.fn('RANDOM'), // to order randomly in Postgres (we use findOne function, then we don't need to add option limit:1)
            ]
        });

        return (body);
    },

    /**
     * Get a random conclusion with a specific tag
     * @param {integer} tagId id of the tag
     * @returns {Conclusion} Random conclusion with the tag id
     */
     async getRandomConclusionWithTag(tagId) {
        const conclusion = await Conclusion.findOne({
            attributes: ['id','content'], // If we just want content instead of all columns
            include: [{
                association: 'tags', // add tags linked to the conclusion
                attributes: ['id','title'], // return some attributes of the tags
                through: {
                    attributes: [] // To don't return the through table attributes
                  },
                where: {
                    'id': tagId, // to get only one conclusion with the id tag specified
                },
            }],

            order: [
                Sequelize.fn('RANDOM'), // to order randomly in Postgres (we use findOne function, then we don't need to add option limit:1)
            ]
        });

        return (conclusion);
    },

    /**
     * Get a random tag
     * @returns {Tag} Random Tag
     */
    async getRandomTag() {
        const tag = await Tag.findOne({
            order: [
                Sequelize.fn('RANDOM'), 
            ]
        });
        console.log(tag);
        return (tag);
    }
}