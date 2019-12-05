let mongoose= require('mongoose');
let joi = require('@hapi/joi');
let jwt = require('jsonwebtoken');
let cartItems = require('./cartItem.schema');
let cart = new mongoose.Schema({
    userEmail:{type:String,required:true},
    cartItem:{type:cartItems.cartItem,required:true}
});
cart.methods.generateToken = function(){
    let token = jwt.sign({_id:this._id},'sshh');
    return token;
};

let userCart = mongoose.model('userCart', cart);

function validateError(message)
{
    let schema = joi.object({
        userEmail: joi.string().required(),
        cartItem: joi.required(),
    });

    return schema.validate(message);
}

module.exports = { userCart , validateError }