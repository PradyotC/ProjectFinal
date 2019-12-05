let express = require('express');
let router = express.Router();
let product = require('../../db/product/product.schema');

// Add Category
router.post('/addCategory', async(req,res) => {
    try {
        let { error } = product.validateCategory(req.body);
        if (error) { return res.status(403).send(error.details[0].message)}
        let category = await product.Category.findOne({"catName": req.body.catName});
        if (category) { return res.status(402).send({ message: 'this category already exists'}) }
        let data = new product.Category({
            catName: req.body.catName,
            subCatid: req.body.subCatid
        });
        let result = await data.save();
        res.send({
            message: 'Category added successfully',
            data: result
        });
    }
    catch(ex) {
        res.send(ex.message);
    }
});

// Find Category by Id
router.get('/findCategory/:id', async(req,res) => {
    try {
        let category = await product.Category.findOne({"_id": req.params.id});
        if (!category) { return res.status(402).send({ message: 'Invalid request'}) }
            let subCategoryList = [];
            for(let i = 0;i<category.subCatid.length;i++)
            {
                let x = await product.subCategory.findOne({"_id": category.subCatid[i]});
                if(x){subCategoryList.push(x);}
            }
        res.send({
            message: "Category search successfull",
            catName: category.catName,
            subCategory: subCategoryList
        });
    }
    catch(ex) {
        res.send(ex.message);
    }
});

// Find all Category
router.get('/allCategory', async(req,res) => {
    try {
        let category = await product.Category.find({});
        if (category.length==0) { return res.status(402).send({ message: 'Invalid request'}) }
        let Category = [];
        for(let j = 0;j<category.length;j++)
        {
            let subCategoryList = [];
            for(let i = 0;i<category[j].subCatid.length;i++)
            {
                let x = await product.subCategory.findOne({"_id": category[j].subCatid[i]});
                if(x){subCategoryList.push(x);}
            }
            Category.push({
                catName:category[j].catName,
                subCategory: subCategoryList
            });
        }
        res.send({
            message: 'Category search result',
            result: Category
        });
    }
    catch(ex) {
        res.send(ex.message);
    }
});

// Remove a Category
router.delete('/removeCategory/:id', async(req,res) => {
    try {    
        let category = await product.Category.findByIdAndRemove({"_id": req.params.id});
        if(!category) {return res.status(404).send({message:'Invalid request'})}
        res.send({message:'removed the category'})
    } 
    catch (ex) {
        res.send(ex.message);    
    }
});


// Find Products by Category and Page No.

router.get('/:category/page/:pageIndex', async (req, res) => {
    try {
        let perPage = 3;
        let currentPage = req.params.pageIndex || 1;
        let productData = await product.product.find({"Category":req.params.category}).skip((perPage * currentPage) - perPage).limit(perPage);
        let dataCount = await product.product.find().count();
        let pageSize = Math.ceil(dataCount / perPage);
        res.send({
            perPage: perPage,
            currentPage: currentPage,
            result: productData,
            pageSize: pageSize,
        });
    }
    catch (ex) {
        res.send(ex.message);
    }
});


// Find Products by Category, subcategory and Page No.

router.get('/:category/subCategory/:subCategory/page/:pageIndex', async (req, res) => {
    try {
        let perPage = 3;
        let currentPage = req.params.pageIndex || 1;
        let productData = await product.product.find({"Category":req.params.category,"subCategory":req.params.subCategory}).skip((perPage * currentPage) - perPage).limit(perPage);
        let dataCount = await product.product.find().count();
        let pageSize = Math.ceil(dataCount / perPage);
        res.send({
            perPage: perPage,
            currentPage: currentPage,
            result: productData,
            pageSize: pageSize,
        });
    }
    catch (ex) {
        res.send(ex.message);
    }
});

module.exports=router;