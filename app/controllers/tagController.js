const { Tag } = require("../models");

module.exports = {

    /**
     * Get all tags
     * @param {*} _ 
     * @param {*} res HTTP response from Express app
     */
    async getAllTags(_, res) {
        console.log("getALl")
        const tags = await Tag.findAll();
        res.json(tags);
    }
}