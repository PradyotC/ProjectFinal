let express = require('express');
let router = express.Router();
let users = require('../../db/user/user.register.schema');
let bycrypt = require('bcryptjs');
let joi = require('@hapi/joi');
router.post('/resetpassword/:id', async(req,res) => {
    try {
        let {error} = validateError(req.body);
        if(error){return res.status(403).send(error.details[0].message)}
        let user = await users.register.findOne({
            "resetPasswordToken": req.params.id,
            "resetPasswordExpires": {$gt:Date.now()}
        });
        if(!user) { return res.status(401).send({message:'Invalid token'})}
        console.log(user.UserLogin.userPassword);
        console.log(req.body.UserLogin.userPassword);
        let comparePassword = await bycrypt.compare(req.body.UserLogin.userPassword,user.UserLogin.userPassword);
        if(comparePassword) { return res.status(403).send({message:'Entered old password'})}
        let salt = await bycrypt.genSalt(10);
        user.UserLogin.userPassword = await bycrypt.hash(req.body.UserLogin.userPassword,salt);
        user.resetPasswordToken = undefined,
        user.resetPasswordExpires = undefined;
        let data = await user.save();
        res.send({message:'Password updated',data: data});
    }
    catch(ex)
    {
        res.send(ex.message);
    }
});

function validateError(message) {
    let authSchema = joi.object({
        UserLogin:{
            //userEmail: joi.string().required().min(5).max(250),
            userPassword: joi.string().required()
        }
    })
    return authSchema.validate(message);
}


module.exports = router;