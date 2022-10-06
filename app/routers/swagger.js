
/** ************************* */
/*         SWAGGER           */
/** ************************ */

/** ******* */
/* SCHEMAS */
/** ******* */

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
 * Schema of an introduction with tags
 * @typedef {object} IntroductionWithTags
 * @property {number} id - Id of the introduction
 * @property {string} content - Content of the introduction
 * @property {array<Tag>} tags - Array of the tags of the introduction
 */

/**
 * Schema of a body
 * @typedef {object} Body
 * @property {number} id - Id of the body
 * @property {string} content - Content of the body
 */

/**
 * Schema of a body
 * @typedef {object} BodyWithTags
 * @property {number} id - Id of the body
 * @property {string} content - Content of the body
 * @property {array<Tag>} tags - Array of the tags of the body
 */

/**
 * Schema of a conclusion
 * @typedef {object} Conclusion
 * @property {number} id - Id of the conclusion
 * @property {string} content - Content of the conclusion
 */

/**
 * Schema of a conclusion
 * @typedef {object} ConclusionWithTags
 * @property {number} id - Id of the conclusion
 * @property {string} content - Content of the conclusion
 * @property {array<Tag>} tags - Array of the tags of the conclusion
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
 * Schema of a user
 * @typedef {object} User
 * @property {string} firstname - Firstname of the user
 * @property {string} lastname - Lastname of the user
 * @property {string} email - EMail of the user
 * @property {string} password - Password of the user
 */

/**
 * Schema of a userForm
 * @typedef {object} UserForm
 * @property {string} firstname - Firstname of the user
 * @property {string} lastname - Lastname of the user
 * @property {string} email - EMail of the user
 * @property {string} password - Password of the user
 * @property {string} confirmPassword - Password of the user
 */

/**
 * Schema of a body to add post
 * @typedef {object} BodyNewPost
 * @property {number} postId - id of the post to add
 * @property {number} introductionId - id of the introduction
 * @property {number} bodyId - id of the body
 * @property {number} conclusionId - id of the conclusion
 */

/**
 * Schema of a body to update user
 * newEmail, newPassword, confirmPassword, newFirstname, newLastname
 * @typedef {object} BodyUpdateUser
 * @property {string} email.required - email of the user
 * @property {string} password.required - password of the user
 * @property {UserForm} update - Fields to update for the user
 * 
 */
