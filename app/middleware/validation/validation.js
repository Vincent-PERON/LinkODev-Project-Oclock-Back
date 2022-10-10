const Joi = require("joi");

const validationModule = {
    /**
     * Méthode pour valider le body d'une requête
     * @param {Joi.ObjectSchema} schema schema à respecter
     * @returns 
     */
    validateBody(schema){
        return (req,res,next)=>{
            const { error } = schema.validate(req.body);
            if(error){
                // il y a une erreur, que faire ???
                console.log(schema);
                res.status(400).json({error:`Problème de format du body de la requête`});
            }
            else{
                next();
            }
        }
    },
    /**
     * Méthode pour valider les queryString
     * @param {Joi.ObjectSchema} schema schema à respecter
     * @returns 
     */
    validateQuery(schema){
        return (req,res,next)=>{
            const { error } = schema.validate(req.query);
            if(error){
                // il y a une erreur, que faire ???
                res.status(400).json({message:"Internal error"});
            }
            else{
                next();
            }
        }
    }
};

module.exports = validationModule;