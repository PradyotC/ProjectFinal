let express = require('express');
let router = express.Router();
let product = require('../../db/product/product.schema');
router.post('/addSubCategory', async(req,res) => {
    try {
        let { error } = product.validateSubCategory(req.body);
        if (error) { return res.status(403).send(error.details[0].message)}
        let subCategory = await product.Category.findOne({"name": req.body.name});
        if (subCategory) { return res.status(402).send({ message: 'this SubCategory already exists'}) }
        let data = new product.subCategory({
            name: req.body.name,
        });
        let result = await data.save();
        res.send({
            message: 'subCategory added successfully',
            data: result
        });
    }
    catch(ex) {
        res.send(ex.message);
    }
});
module.exports=router;