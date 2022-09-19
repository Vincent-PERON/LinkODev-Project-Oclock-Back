const Sequelize = require('sequelize');
const sequelize = require('../database');

class User extends Sequelize.Model {

get fullname() {
    return this.firstname + ' ' + this.lastname;
};

};

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
}, {
sequelize,
tableName: "user"
});


module.exports = User;