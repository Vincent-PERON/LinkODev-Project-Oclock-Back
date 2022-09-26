const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class Post extends Model {};

Post.init({
    title: DataTypes.TEXT,
}, {
    sequelize,
    tableName: 'post'
});

module.exports = Post;