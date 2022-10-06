require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = require('../database');
/* JWT Token */
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

class User extends Sequelize.Model {};

User.init({
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {msg: "Email nécessaire"},
            isEmail: {msg: "Format email invalide"}

        }
    },
    
    password: { 
        type: Sequelize.STRING,
        allowNull: false,
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
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
 * Function to check if the password in parameter matches the password of the User model instance
 * @param {string} password Password to check
 * @returns {Promise<boolean>}  Promise with boolean -> True : password OK, False : Wrong password
 */
User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

/**
 * Function to get an access token (JWT) for a user
 * @returns {string}  Token
 */
User.prototype.getJWT = function() { 
    return jwt.sign(
        { firstName: this.firstname, lastName: this.lastname },
            process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: process.env.ACCESS_TOKEN_ALGORITHM,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN, // 
            subject: this.id.toString()
        }
    );
};

module.exports = User;