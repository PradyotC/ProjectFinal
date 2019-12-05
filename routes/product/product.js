let express = require("express");
let router = express.Router();
let product = require('../../db/product/product.schema');
router.post('/addProduct', async (req, res) => {
    try {
        let { error } = product.validateProduct(req.body);
        if (error) { return res.status(401).send(error.details[0].message); }
        let productData = await product.product.findOne({ 'name': req.body.name });
        if (productData) { return res.status(402).send({ 'message': 'Product already exist' }) }
        let data = new product.product({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            offerPrice: req.body.offerPrice,
            isAvailable: req.body.isAvailable,
            isTodayOffer: req.body.isTodayOffer,
            Category: req.body.Category,
            subCategory: req.body.subCategory,
            isAdmin: req.body.isAdmin,
            recordDate: Date.now(),
            updatedDate: Date.now()
        });
        let result = await data.save();
        res.send({
            message: "Product Saved",
            result: result
        })
    }
    catch (ex) {
        res.send(ex.message);
    }
});

// Update a product
router.put('/updateProduct/:id', async (req, res) => {
    try {
        let productData = await product.product.findById(req.params.id);
        if (!productData) { return res.status(404).send({ 'message': 'Invalid request' }) }
        let k = new product.product();
        if (req.body.name) { productData.name = req.body.name }
        if (req.body.image) { productData.image = req.body.image }
        if (req.body.description) { productData.description = req.body.description }
        if (req.body.price) { productData.price = req.body.price }
        if (req.body.offerPrice) { productData.offerPrice = req.body.offerPrice }
        if (req.body.isAvailable) { productData.isAvailable = req.body.isAvailable }
        if (req.body.isTodayOffer) { productData.isTodayOffer = req.body.isTodayOffer }
        if (req.body.Category) { productData.Category = req.body.Category }
        if (req.body.subCategory) { productData.subCategory = req.body.subCategory }
        if (req.body.isAdmin) { productData.isAdmin = req.body.isAdmin }
        productData.updatedDate = Date.now();
        let { error } = product.validateUpdateProduct(req.body);
        if (error) { return res.status(403).send(error.details[0].message) }
        let result = await productData.save();
        res.send({
            message: 'Product updated successfully',
            result: result
        });
    } catch (ex) {
        res.send(ex.message);
    }
});

// Remove a Product
router.delete('/removeProduct/:id', async (req, res) => {
    try {
        let productData = await product.product.findByIdAndRemove({ "_id": req.params.id });
        if (!productData) { return res.status(404).send({ message: 'Invalid request' }) }
        res.send({ message: 'removed the product' })
    }
    catch (ex) {
        res.send(ex.message);
    }
});


// Find all Products
router.get('/allProduct', async (req, res) => {
    try {
        let productData = await product.product.find({});
        if (productData.length == 0) { return res.status(402).send({ message: 'Invalid request' }) }
        res.send({
            message: 'Product search result',
            result: productData
        });
    }
    catch (ex) {
        res.send(ex.message);
    }
});


// Find product by Id
router.get('/findProduct/:id', async (req, res) => {
    try {
        let productData = await product.product.findById(req.params.id);
        if (!productData) { return res.status(402).send({ message: 'Invalid request' }) }
        res.send({
            message: 'Product search result',
            result: productData
        });
    }
    catch (ex) {
        res.send(ex.message);
    }
});

// Find Products by Page No.

router.get('/page/:pageIndex', async (req, res) => {
    try {
        let perPage = 3;
        let currentPage = req.params.pageIndex || 1;
        let productData = await product.product.find({}).skip((perPage * currentPage) - perPage).limit(perPage);
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

// Get latest Product
router.get('/latestProduct', async (req, res) => {
    try {
        let productData = await product.product.find({}).sort('-updatedDate');
        if (productData.length==0) { return res.status(402).send({ message: 'Invalid request' }) }
        res.send({
            message: 'Product search result',
            result: productData[0]
        });
    }
    catch (ex) {
        res.send(ex.message);
    }
});

// Get all Products with offer
router.get('/offerProduct', async (req, res) => {
    try {
        let productData = await product.product.find({'isTodayOffer':true});
        if (productData.length == 0) { return res.status(402).send({ message: 'Invalid request' }) }
        res.send({
            message: 'Product search result',
            result: productData
        });
    }
    catch (ex) {
        res.send(ex.message);
    }
});


module.exports = router;