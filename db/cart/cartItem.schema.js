let mongoose= require('mongoose');
let joi = require('@hapi/joi');
let jwt = require('jsonwebtoken');
let cart = new mongoose.Schema({
    prodId:{type:String,required:true},
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    totalPrice:{type:Number,required:true},
    recordDate:{type:Date,required:true},
    updateDate:{type:Date,required:true}
});
cart.methods.generateToken = function(){
    let token = jwt.sign({_id:this._id},'sshh');
    return token;
};

let cartItem = mongoose.model('cartItem', cart);

function validateError(message)
{
    let schema = joi.object({
        prodId: joi.string().required(),
        name: joi.string().required(),
        image: joi.string(),
        price: joi.number().required(),
        quantity: joi.number().required(),
        totalPrice: joi.number(),
        recordDate: joi.date(),
        updateDate: joi.date()
    });

    return schema.validate(message);
}

module.exports = { cartItem , validateError }