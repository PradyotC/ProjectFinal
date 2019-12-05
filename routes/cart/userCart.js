let express  = require('express');
let userCart = require('../../db/cart/userCart.schema');
let users = require('../../db/user/user.register.schema');
let cartItem = require('../../db/cart/cartItem.schema');
let router = express.Router();
router.post('/register', async(req,res) => {
    try {
        let { error } = userCart.validateError(req.body);
        if (error) { return res.status(403).send(error.details[0].message) }
        let user = await users.register.findOne({ "_id": req.body._id });
        if (!user) { return res.status(402).send({ message: 'Invalid user' }) }
        let product = await cartItem.cartItem.findOne({"_id": req.body._id});
        if (!product) { return res.status(402).send({ message: 'Invalid product' }) }
        let data = new userCart.cartItem({
            userEmail : req.body.email,
            cartItem : req.body.cartItem
        });
        let token = data.generateToken();
        let result = await data.save();
        res.send({
            message:'Registeration Successfull',
            item: result
        });
    }
    catch(ex) {
        res.send(ex.message);
    }
});

module.exports=router;