const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class Conclusion extends Model {};

Conclusion.init({
    content: DataTypes.TEXT,
}, {
    sequelize,
    tableName: 'conclusion'
});

module.exports = Conclusion;