let mongoose = require('mongoose');
let joi = require('@hapi/joi');
let subCategorySchema = new mongoose.Schema({
    name:{type:String,required:true}
});
let subCategory = mongoose.model('subCategory',subCategorySchema);
let categorySchema = new mongoose.Schema({
    catName: {type:String,required:true},
    subCatid: {type:[String]}
});
let Category = mongoose.model('category',categorySchema);
let productSchema = new mongoose.Schema({
    name: {type:String,required:true},
    image: {type:String,required:true},
    description: {type:String},
    price: {type:Number,required:true},
    offerPrice: {type:Number},
    isAvailable: {type:Boolean,required:true},
    isTodayOffer:{type:Boolean},
    Category: {type:String,required:true},
    subCategory: {type:String,required:true},
    isAdmin: {type:Boolean},
    recordDate: {type:Date,default:Date.now},
    updatedDate: {type:Date,default:Date.now}
});
let product = mongoose.model('product',productSchema);
function validateSubCategory(message)
{
    let schema = joi.object({
        name: joi.string().required(),
    });
    return schema.validate(message);
}
function validateCategory(message)
{
    let schema = joi.object({
        catName: joi.string().required(),
         subCatid: joi.array().required() 
    });
    return schema.validate(message);
}
function validateProduct(message)
{
    let schema = joi.object({
        name: joi.string().required(),
        image: joi.string().required(),
        description: joi.string(),
        price: joi.number().required(),
        offerPrice: joi.number(),
        isAvailable: joi.boolean().required(),
        isTodayOffer:joi.boolean(),
        Category: joi.string().required(),
        subCategory: joi.string().required(),
        isAdmin: joi.boolean()
    });
    return schema.validate(message);
}
function validateUpdateProduct(message)
{
    let schema = joi.object({
        name: joi.string(),
        image: joi.string(),
        description: joi.string(),
        price: joi.number(),
        offerPrice: joi.number(),
        isAvailable: joi.boolean(),
        isTodayOffer:joi.boolean(),
        Category: joi.string(),
        subCategory: joi.string(),
        isAdmin: joi.boolean()
    });
    return schema.validate(message);
}
module.exports = {subCategory,Category,product,validateSubCategory,validateCategory,validateUpdateProduct,validateProduct};