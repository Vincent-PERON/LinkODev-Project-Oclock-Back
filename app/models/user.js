require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = require('../database');

/* JWT Token */
const jwt = require('jsonwebtoken');

/* Bcrypt */
const bcrypt = require('bcrypt');

/* Password validators */
const passwordValidator = require('password-validator');


class User extends Sequelize.Model {};

User.init({

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: "Email nécessaire"},
            notEmpty: {msg: "Email nécessaire"},
            isEmail: {msg: "Format email invalide"},
        },
        unique: {msg: `Email déjà utilisé`},
    },
    
    password: { 
        type: Sequelize.STRING,
        allowNull: false,     

        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        set (value) {
            const schema = new passwordValidator();

                // Add properties to it
                schema
                                .is().min(8,'8 caractères')             // Minimum length 8
                                .is().max(100, '100 caractères max')     // Maximum length 30 (xss fails)
                                .has().uppercase(1, '1 majuscule')     // Must have uppercase letters
                                .has().lowercase(1, '1 minuscule')     // Must have lowercase letters
                                .has().digits(2, '2 chiffres')         // Must have digits
                                .has().symbols(1, '1 caractère spécial (@!+$*€)')   // Must have symbols
                
                // Check if passwords respects the security rules
                const result = schema.validate(value,{ details: true });
                if (result.length) throw new Error(`Le mot de passe doit contenir : ${result.map(x => x.message).join(', ')}`);

                // If password respects the security rules -> Hashing password
                this.setDataValue('password', bcrypt.hashSync(value,10));
        }
    },

    firstname: { 
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: "Prénom nécessaire"},
            notEmpty: {msg: "Prénom nécessaire"},
        },
    },

    lastname:  { 
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {msg: "Nom nécessaire"},
            notEmpty: {msg: "Nom nécessaire"},
        },
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