let mongoose = require('mongoose');
let joi = require('@hapi/joi');
let userschema = new mongoose.Schema({
    firstName:{type:String,required:true,minLength:5,maxLength:250},
    lastName:{type:String,required:true,minLength:5,maxLength:250},
    UserLogin:{
        userEmail:{type:String,required:true,unique:true},
        userPassword:{type:String,required:true}
    },
    termsAcceptCheck:{type:Boolean,required:true},
    isAdmin:{type:Boolean}
});
let register = mongoose.model('register',userschema);

function validateError(message)
{
    let schema = joi.object({
        firstName: joi.string().required().min(5).max(250),
        lastName:joi.string().min(5).max(250),
        UserLogin:{
            userEmail:joi.string().required().email(),
            userPassword:joi.string().required()
        },
        termsAcceptCheck:joi.boolean().required(),
        isAdmin:joi.boolean()
    })
    return schema.validate(message);
}

module.exports = {register,validateError};