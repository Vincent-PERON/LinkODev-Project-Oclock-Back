require('dotenv').config({path: '../.env'});

// Init the connection with the database
const sequelize = require('../app/database');
// Get models
const {Body, Conclusion, Introduction, Post, Tag, User} = require('../app/models');
// Get data from JSON file to seed the database
const data = require('./data.json');

/**
 * DB object
 */
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
            // Import data from data.json (bulk : Create and insert multiple instances)
            // https://sequelize.org/api/v6/class/src/model.js~model#static-method-bulkCreate
            await Introduction.bulkCreate(data.introductions);
            await Body.bulkCreate(data.bodies);
            await Conclusion.bulkCreate(data.conclusions);
            await Tag.bulkCreate(data.tags);
            await User.bulkCreate(data.users);
            await Post.bulkCreate(data.posts);

            // Example : Add the tag with id 1 to the intro with id 1
            const tag1 = await Tag.findByPk(1);
            const intro1 = await Introduction.findByPk(1);
            await intro1.setTags(tag1);

        } catch (error) {
            console.error('Error with the seeding of tables: ', error);
        }
    }
};

// db.testConnection();
// db.create();
// db.seeding();

// Firstly, we test the connection with the db
db.testConnection()
    .then( () => {
        // Then, we create tables
        db.create()
            .then( ()=> {
            // Finaly, seed tables with data 
                db.seeding()
                    .catch((error) => {
                        console.error(error)
                    })
                })
    })
;


