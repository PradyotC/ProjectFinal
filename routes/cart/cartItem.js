let express = require("express");
let router = express.Router();
let cart = require('../../db/cart/cartItem.schema');
let multer = require('multer');
let path = require('path');
let port = 'http://localhost:4500/';
let pathDir = path.join(__dirname,'../../uploads');
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null , pathDir);
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + file.originalname);
    }
});
let filefilter = function(req,file,cb){
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null,true);
    } else {
        cb(null,false);
    }
};

let filestorage = multer({
    storage: storage,
    limits: {
        fieldSize: 1024*1024*5
    },
    fileFilter: filefilter
});
router.post('/uploadData', filestorage.single('image'), async (req, res) => {
    try {
        let { error } = cart.validateError(req.body);
        if (error) { return res.status(401).send(error.details[0].message); }
        let data = new cart.cartItem({
            prodId: req.body.prodId,
            name: req.body.name,
            image: port + 'uploads/' + req.file.filename,
            price: req.body.price,
            quantity: req.body.quantity,
            totalPrice: req.body.price * req.body.quantity,
            recordDate: Date.now(),
            updateDate: Date.now()
        });
        if(!data){ return res.status(403).send({message: 'Something went wrong'})}
        let token = data.generateToken();
        let saveData = await data.save();
        res.send({ message: 'File uploaded', token: token , data: saveData });
    }
    catch (ex) {
        res.send(ex.message);
    }
});

module.exports = router;