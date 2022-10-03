const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {};

User.init({
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    
    password: { 
        type: Sequelize.STRING,
        allowNull: false,
    },

    firstname: { 
        type: Sequelize.STRING,
        allowNull: false,
    },

    lastname:  { 
        type: Sequelize.STRING,
        allowNull: false,
    },
    
    fullname : {
        type: Sequelize.VIRTUAL,
        get() {
            return `${this.firstname} ${this.lastname}`;
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