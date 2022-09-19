const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class Body extends Model {};

Body.init({
    content: DataTypes.TEXT,
}, {
    sequelize,
    tableName: 'body'
});

module.exports = Body;