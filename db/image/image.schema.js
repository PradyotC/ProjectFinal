let mongoose = require('mongoose');
let joi = require('@hapi/joi');
let imageSchema = new mongoose.Schema({
    imgUrl:{type:String,required:true}
});
let image = mongoose.model('image',imageSchema);
module.exports = image;