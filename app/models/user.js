const Sequelize = require('sequelize');
const sequelize = require('../database');

const bcrypt = require('bcrypt');

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
        // Hash password 
        set (value) {
            this.setDataValue('password', bcrypt.hashSync(value,10));
        }
    },

    firstname: { 
        type: Sequelize.STRING,
        allowNull: false,
    },

    lastname:  { 
        type: Sequelize.STRING,
        allowNull: false,
    },
    
    fullName : {
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

/**
 * Function to check if the password of the user is good or not
 * @param {string} password Password to check
 * @returns {Promise<boolean>}  Promise with boolean -> True : password OK, False : Wrong password
 */
User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;