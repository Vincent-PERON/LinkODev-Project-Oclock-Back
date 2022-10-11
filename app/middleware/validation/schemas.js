/** *****************
 *      BODIES
 ******************/

/** 
 * joi lets you describe your data using a simple, intuitive, and readable language.
 * ttps://joi.dev/api/?v=17.6.1
 */
 const Joi = require('joi');

/**
 * Schema of a userForm
 * @typedef {object} userForm
 * @property {string} firstname.required - Firstname of the user
 * @property {string} lastname.required - Lastname of the user
 * @property {string} email.required - EMail of the user
 * @property {string} password.required - Password of the user
 * @property {string} confirmPassword.required - Password of the user
 */
const userForm = Joi.object({ 
    firstname:Joi.string().required(),
    lastname: Joi.string().required(),
    email:Joi.string().required(), 
    password:Joi.string().required(), 
    confirmPassword:Joi.string().required()
}).required();


/**
 * Schema of a loginForm
 * @typedef {object} loginForm
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Password of the user
 */
const loginForm = Joi.object({ 
    email:Joi.string().required(), 
    password:Joi.string().required(), 
}).required();

/**
 * Schema of a updateUserForm
 * @typedef {object} updateUserForm
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Password of the user
 * @property {userForm} update - Object with fields to update for the user
 */
 const updateUserForm = Joi.object({ 
    email:Joi.string().required(), 
    password:Joi.string().required(),
    update: Joi.object({
        firstname:Joi.string(), 
        lastname: Joi.string(),
        email:Joi.string(), 
        password:Joi.string(), 
        confirmPassword:Joi.string()
    })
        .with('password','confirmPassword').error(new Error("Le mot de passe nécessite une confirmation."))
        .min(1)
        .required()
});

/**
 * Schema of a body to add new post
 * @typedef {object} BodyNewPost
 * @property {number} introductionId - id of the introduction
 * @property {number} bodyId - id of the body
 * @property {number} conclusionId - id of the conclusion
 */

const bodyNewPost = Joi.object({
    introductionId: Joi.number().required(),
    bodyId: Joi.number().required(),
    conclusionId: Joi.number().required()
});

/**
 * Schema of a body to add old post
 * @typedef {object} BodyOldPost
 * @property {number} postId - id of the post
 */
const bodyOldPost = Joi.object({
    postId: Joi.number().required(),
});

const bodyAddPost = Joi.alternatives().try(bodyOldPost,bodyNewPost,);




/** *****************
 *      RESPONSES
 ******************/

/**
 * Schema of a sucess Response
 * @typedef {object} successResponse
 * @property {string} status - Description of the success
 */

/**
 * Schema of a bad Response
 * @typedef {object} badResponse
 * @property {string} error - Description of the error
 */

/**
 * Schema of a success login response
 * @typedef {object} loginResponse
 * @property {string} accesstoken - JWT for the user connected
 * @property {string} user - Name of the user connected
 */

/**
 * Schema of a tag
 * @typedef {object} Tag
 * @property {number} id.required - Id of the tag
 * @property {string} title - Title of the tag
 */

/**
 * Schema of an introduction
 * @typedef {object} Introduction
 * @property {number} id - Id of the introduction
 * @property {string} content - Content of the introduction
 */

/**
 * Schema of a body
 * @typedef {object} Body
 * @property {number} id - Id of the body
 * @property {string} content - Content of the body
 */

/**
 * Schema of a conclusion
 * @typedef {object} Conclusion
 * @property {number} id - Id of the conclusion
 * @property {string} content - Content of the conclusion
 */

/**
 * Schema of a post
 * @typedef {object} Post
 * @property {integer} id - Id of the post
 * @property {string} UpdatedAt - Updated date of the post
 * @property {Introduction} introduction - Introduction of the post
 * @property {Body} body - Body of the post
 * @property {Conclusion} conclusion - Conclusion of the post
 */


/**
 * Schema of an introduction with tags
 * @typedef {object} IntroductionWithTags
 * @property {number} id - Id of the introduction
 * @property {string} content - Content of the introduction
 * @property {array<Tag>} tags - Array of the tags of the introduction
 */

/**
 * Schema of a body with tags
 * @typedef {object} BodyWithTags
 * @property {number} id - Id of the body
 * @property {string} content - Content of the body
 * @property {array<Tag>} tags - Array of the tags of the body
 */

/**
 * Schema of a conclusion with tags
 * @typedef {object} ConclusionWithTags
 * @property {number} id - Id of the conclusion
 * @property {string} content - Content of the conclusion
 * @property {array<Tag>} tags - Array of the tags of the conclusion
 */

/**
 * Schema of a post with tags
 * @typedef {object} PostWithTags
 * @property {integer} id - Id of the post
 * @property {string} UpdatedAt - Updated date of the post
 * @property {IntroductionWithTags} introduction - Introduction of the post with tags
 * @property {BodyWithTags} body - Body of the post with tags
 * @property {ConclusionWithTags} conclusion - Conclusion of the post with tags
 * @property {string} content - Content of the post (content of introduction, body and conclusion)
 */

/**
 * Schema of a user
 * @typedef {object} User
 * @property {string} firstname - Firstname of the user
 * @property {string} lastname - Lastname of the user
 * @property {string} email - Email of the user
 * @property {string} password - Password of the user
 */

/**
 * Schema of details returned for a user
 * @typedef {object} userResponse
 * @property {string} firstname - Firstname of the user
 * @property {string} lastname - Lastname of the user
 * @property {string} email - Email of the user
 */

module.exports = { userForm, loginForm, updateUserForm, bodyAddPost} ;