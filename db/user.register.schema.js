let mongoose = require('mongoose');
let joi = require('@hapi/joi');
let jwt = require('jsonwebtoken');
let userschema = new mongoose.Schema({
    firstName:{type:String,required:true,minLength:5,maxLength:250},
    lastName:{type:String,required:true,minLength:5,maxLength:250},
    newsLetterCheck:{type:Boolean},
    UserLogin:{
        userEmail:{type:String,required:true,unique:true},
        userPassword:{type:String,required:true}
    },
    termsAcceptCheck:{type:Boolean,required:true},
    resetPasswordToken:{type:String},
    resetPasswordExpires:{type:Date},
    isAdmin:{type:Boolean}
});
userschema.methods.generateToken = function() {
    let token = jwt.sign({_id:this._id},'sshh');
    return token;
};
let register = mongoose.model('register',userschema);
function validateError(message)
{
    let schema = joi.object({
        firstName: joi.string().required().min(5).max(250),
        lastName:joi.string().min(5).max(250),
        newsLetterCheck:joi.boolean(),
        UserLogin:{
            userEmail:joi.string().required().email(),
            userPassword:joi.string().required()
        },
        termsAcceptCheck:joi.boolean().required(),
        resetPasswordToken:joi.string(),
        resetPasswordExpires:joi.date(),
        isAdmin:joi.boolean()
    })
    return schema.validate(message);
}

module.exports = {register,validateError};