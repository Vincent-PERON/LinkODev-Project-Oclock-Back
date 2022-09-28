const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {};

User.init({
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    
    password: Sequelize.STRING,

    firstname: {
        type: Sequelize.STRING,
        allowNull: true
    },

    lastname: Sequelize.STRING,
    
    fullName : {
        type: Sequelize.VIRTUAL,
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
            throw new Error('Do not try to set the `fullName` value!');
        }
    }
}, 
{
    sequelize,
    tableName: "user"
});


module.exports = User;