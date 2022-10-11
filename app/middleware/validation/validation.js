const Joi = require("joi");

const validationModule = {
    /**
     * Validate the body of the request
     * @param {Joi.ObjectSchema} schema schema to respect
     * @return {function|object} if no error, next. Else, return JSON response
     */
    validateBody(schema){
        return (req,res,next)=>{
            const { error } = schema.validate(req.body);
            if(error){
                res.status(400).json({error:`Problème de format du body de la requête (${error})`});
            }
            else{
                next();
            }
        }
    }
};

module.exports = validationModule;