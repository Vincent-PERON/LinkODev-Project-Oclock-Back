const { User, Post } = require("../models");

/* Password and email Validator Module */
const assert = require('assert');
const validator = require('email-validator');
const passwordValidator = require('password-validator');

// Create a password schema
const schema = new passwordValidator();

// Add properties to it
schema
			    .is().min(8)                                    // Minimum length 8
			    .is().max(100)                                  // Maximum length 100
			    .has().uppercase()                              // Must have uppercase letters
			    .has().lowercase()                              // Must have lowercase letters
			    .has().digits(2)                                // Must have at least 2 digits
			    .has().not().spaces()                           // Should not have spaces
			    .is().not().oneOf(['Passw0rd', 'Password123','Azerty','azerty']); // Blacklist these values

module.exports = { 
    /**
     * Get details of one user 
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
     */
    async getUser(req,res){
        const foundUser = await User.findOne(
            {   
                attributes: ['email'],
                where : {
                    id: req.user.sub
                }
            }
        );
        res.json(foundUser);
    },

    /**
     * Update details of one user ####### TODO #######
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
    */
    async updateUser(req,res){
        try {
            // Get user
            const userId = parseInt(req.user.sub);
            const user = await User.findByPk(userId);
            if (!user) return res.status(404).json("Utilisateur introuvable");

            // Get attributes to update for the user
            const {email,password, newPassword, confirmPassword} = req.body;

            
            if (email) { // If email in the body
                //  -> Test if email is valide (module "email-avlidator")
                assert.ok(validator.validate(email), `${email} n'est pas un email valide.`); 
                user.email = email; // Update the email
            }

            /*

            //  -> The 2 passwords (pwd + confim) are the same
            assert.ok(req.body.password === req.body.confirmPassword, `Les mots de passes ne correspondent pas`);
            
            //  -> Password respects the security rules (Schema)
            assert.ok(schema.validate(req.body.password), `Le mot de passe ne remplit pas les critères de sécurité`);

            // Password Hash (We use bcrypt module to hash password, )
            const encryptedPwd = await bcrypt.hash(req.body.password, 10);  
            
            */
            res.json("updateUser");
            


        } catch (error) {
            res.status(500).json(error);
        }
        
    },

    /**
     * Delete one user
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
     */
    async deleteUser(req,res){
        const userId = parseInt(req.user.sub);

        await User.destroy({
            where: {
                id: userId
            }
        });
        res.json("User Deleted");
    },

    /**
     * Get all posts of one user     
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
    */
    async getAlluserPosts(req,res){
        const userId = parseInt(req.user.sub);
        const userPosts = await User.findByPk(userId, {
            attributes: ['id','firstname','lastname'],
            include: [
                {
                    association: 'posts',
                    include: [
                        {
                            association: 'introduction',
                            attributes: ['id','content']
                        },
                        {
                            association: 'body',
                            attributes: ['id','content']
                        },
                        {
                            association: 'conclusion',
                            attributes: ['id','content']
                        },
                    ],
                    attributes: ['id','updatedAt'],
                    through: {
                        attributes: [] // To don't return the through table attributes
                    },
                },
        ] 
        });
        res.json(userPosts);
    },

    /** Add post to favorites ####### TODO #######
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
    */
    async addPost(req,res){
        try{
            console.log(req.body.postId);
            // Get user
            const userId = parseInt(req.user.sub);
            const user = await User.findByPk(userId);
            if (!user) return res.status(404).json("Utilisateur introuvable");

            // Get post
            const postToAdd = await Post.findByPk(req.body.postId);
            if (!postToAdd) return res.status(404).json("Post introuvable");

            // Add the association between the post and the user
            const addResult = await user.addPost(postToAdd);

            if (addResult) res.status(201).json(`Ajout du post ${req.body.postId}`); 
            else res.json("L'utilisateur a déjà enregistré ce post. Ajout impossible");
        } catch (error) {
            res.json(error);
        }
    },

    /**
     * Delete one post of favorites
     * @param {*} req HTTP request to Express app
     * @param {*} res HTTP response from Express app
     */
        async deletePost(req,res){
            console.log("delete");
            try{
                // Get user
                const userId = parseInt(req.user.sub);
                const user = await User.findByPk(userId);
                if (!user) return res.status(404).json("Utilisateur introuvable");
                
                // Get post
                const postToDelete = await Post.findByPk(req.params.postId);
                if (!postToDelete) return res.status(404).json("Post introuvable");

                // Delete the association between the post and the user
                const deleteResult = await user.removePost(postToDelete);

                if (deleteResult) res.json(`Suppression post ${req.params.postId} OK`); 
                else res.json("L'utilisateur n'a pas enregisré ce post. Suppression impossible"); // If the association between the post and the user doesn't exist
            } catch (error) {
                res.json(error);
            }
        }
}