let mongoose= require('mongoose');
let joi = require('@hapi/joi');
let jwt = require('jsonwebtoken');
let contact = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true}
});
contact.methods.generateToken = function(){
    let token = jwt.sign({_id:this._id},'sshh');
    return token;
};

let contactMessage = mongoose.model('contactMessage', contact);

function validateError(message)
{
    let schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        message: joi.string().required()
    });

    return schema.validate(message);
}

module.exports = { contactMessage , validateError }