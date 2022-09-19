require('dotenv').config();

// Init the connection with the database
const sequelize = require('./app/database');
// Get models
const {Body, Conclusion, Introudction, Post, Tag, User} = require('./app/models');
// const Tag = require('./app/models/tag.js');
const dataTags = require('./data/tag.json');

const db = {
    /**
     * Test the connection 
     */
    testConnection: async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    },
    /**
     * Create tables of the database
     */
    create: async() => {
        try{
            // Drop all tables of the database
            await sequelize.drop();
            // Create the tables if it doesn't exist (and does nothing if it already exists)
            await sequelize.sync();
        } catch (error) {
            console.error('Error with the creation of tables:', error);
        }
    },
    /**
     * Seeding the table with example data 
     */
    seeding: async() => {
        try{
            // const user1 = await User.create({firstname: "firstname1", lastname: "lastname1", email: "mail1@domain.fr", password: "password1"});
            
            // Import data from dataTags (bulk : Create and insert multiple instances)
            // https://sequelize.org/api/v6/class/src/model.js~model#static-method-bulkCreate
            await Tag.bulkCreate(dataTags);

        } catch (error) {
            console.error('Error with the seeding of tables: ', error);
        }
    }
};

// db.testConnection();
// db.create();
db.seeding();