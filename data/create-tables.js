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
            const introductions = await Introduction.bulkCreate(data.introductions);
            const bodies = await Body.bulkCreate(data.bodies);
            const conclusions = await Conclusion.bulkCreate(data.conclusions);
            const tags = await Tag.bulkCreate(data.tags);
            const users = await User.bulkCreate(data.users);
            await Post.bulkCreate(data.posts);

            
            // Example : Add the tag with id 1 to the intro with id 1
            // const tag1 = await Tag.findByPk(1);
            // const intro1 = await Introduction.findByPk(1);
            // await intro1.setTags(tag1);

            introductions.forEach((introduction) => introduction.setTags((data.introductionsTags.find((introductionTags)=> introductionTags.introduction_id === introduction.id)).tags_id));
            bodies.forEach((body) => body.setTags((data.bodiesTags.find((bodyTags)=> bodyTags.body_id === body.id)).tags_id));
            conclusions.forEach((conclusion) => conclusion.setTags((data.conclusionsTags.find((conclusionTags)=> conclusionTags.conclusion_id === conclusion.id)).tags_id));
            users.forEach((user) => user.setPosts((data.usersPosts.find((userPosts)=> userPosts.user_id === user.id)).posts_id));


            // try{
            //     // ADD TAGS

            //     // Add 2 tags for each introduction : n and n+1
            //     introductions.forEach((item,index) => item.setTags([1+index,1+(1+index)%introductions.length]) );
            //     // Add 2 tags for each body : n and n+1
            //     bodies.forEach((item,index) => item.setTags([1+index,1+(1+index)%bodies.length]) );
            //     // Add 2 tags for each conclusion : n and n+1
            //     conclusions.forEach((item,index) => item.setTags([1+index,1+(1+index)%conclusions.length]) );

            // } catch (error) {
            //     console.error('Error with adding tags: ', error);
            // }    

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


