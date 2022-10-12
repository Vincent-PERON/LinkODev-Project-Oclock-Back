// Init Sequelize connection with database
require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true,
  }
});

module.exports = sequelize;