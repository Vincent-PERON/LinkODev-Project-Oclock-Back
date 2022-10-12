const Sequelize = require('sequelize');
const sequelize = require('../database');

class Tag extends Sequelize.Model {};

Tag.init({
    title: Sequelize.TEXT
},{
  sequelize,
  tableName: "tag"
});


module.exports = Tag;