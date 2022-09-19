
const Sequelize = require('sequelize');
const sequelize = require('../database');

const Post = require('./post');
const Introduction = require('./introduction');
const Body = require('./body');
const Conclusion = require('./conclusion');  
const Tag = require('./tag');
const User = require('./user');


/* 
    --------------------- Model POST ---------------------
*/

// un post a une intro
Post.belongsTo(Introduction, {
    foreignKey: "introduction_id",
    as: "introduction"
});

// réciproque : une intro concerne plusieurs posts
Introduction.hasMany(Post, {
    foreignKey: "introduction_id",
    as: "posts"
});

// un post a un body
Post.belongsTo(Body, {
    foreignKey: "body_id",
    as: "body"
});

// réciproque : une intro concerne plusieurs posts
Body.hasMany(Post, {
    foreignKey: "body_id",
    as: "posts"
});


// un post a une conclusion
Post.belongsTo(Conclusion, {
    foreignKey: "conclusion_id",
    as: "conclusion"
});

// réciproque : une conclusion concerne plusieurs posts
Conclusion.hasMany(Post, {
    foreignKey: "conclusion_id",
    as: "posts"
});


/* 
    --------------------- Model USER  ---------------------
*/

// "Un user possède plusieurs posts"
User.belongsToMany(Post, {
    as: "posts", // alias de l'association 
    through: 'user_saves_post', // "via la table de liaison qui s'appelle ..."
    foreignKey: 'user_id', // le nom de la clef de Introduction dans la table de liaison
    otherKey: 'post_id', // le nom de la clef de "l'autre" (donc Tag)
});


/* 
    --------------------- Model TAG  ---------------------
*/

// "Une Introduction possède plusieurs tags"
Introduction.belongsToMany(Tag, {
    as: "tags", // alias de l'association 
    through: 'introduction_has_tag', // "via la table de liaison qui s'appelle ..."
    foreignKey: 'introduction_id', // le nom de la clef de Introduction dans la table de liaison
    otherKey: 'tag_id', // le nom de la clef de "l'autre" (donc Tag)
});

// ... et la réciproque !
// Un Tag possède plusieurs Introductions
Tag.belongsToMany(Introduction, {
    as: "introductionList",
    through: 'introduction_has_tag',
    otherKey: 'introduction_id',
    foreignKey: 'tag_id',
});


// "Un body possède plusieurs tags"
Body.belongsToMany(Tag, {
    as: "tags", // alias de l'association 
    through: 'body_has_tag', // "via la table de liaison qui s'appelle ..."
    foreignKey: 'body_id', // le nom de la clef de Introduction dans la table de liaison
    otherKey: 'tag_id', // le nom de la clef de "l'autre" (donc Tag)
});

// ... et la réciproque !
// Un Tag possède plusieurs body
Tag.belongsToMany(Body, {
    as: "bodyList",
    through: 'body_has_tag',
    otherKey: 'body_id',
    foreignKey: 'tag_id',
});

// "Une Conclusion possède plusieurs tags"
Conclusion.belongsToMany(Tag, {
    as: "tags", // alias de l'association 
    through: 'conclusion_has_tag', // "via la table de liaison qui s'appelle ..."
    foreignKey: 'conclusion_id', // le nom de la clef de Introduction dans la table de liaison
    otherKey: 'tag_id', // le nom de la clef de "l'autre" (donc Tag)
});

// ... et la réciproque !
// Un Tag possède plusieurs Introductions
Tag.belongsToMany(Conclusion, {
    as: "conclusionList",
    through: 'conclusion_has_tag',
    otherKey: 'conclusion_id',
    foreignKey: 'tag_id',
});



(async () => {
    await sequelize.sync({});
})();

module.exports = { Post, Introduction, Body, Conclusion, Tag, User };