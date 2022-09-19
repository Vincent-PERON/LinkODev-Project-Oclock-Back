const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class Introduction extends Model {};

Introduction.init({
    content: DataTypes.TEXT,
}, {
    sequelize,
    tableName: 'introduction'
});

module.exports = Introduction;