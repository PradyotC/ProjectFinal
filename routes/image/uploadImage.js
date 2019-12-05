let express = require("express");
let router = express.Router();
let image = require('../../db/image/image.schema');
let multer = require('multer');
let path = require('path');
let port = 'http://localhost:4500/';
let pathDir = path.join(__dirname, '../../uploads');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
let filefilter = function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

let filestorage = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: filefilter
});

router.post('/uploadImage', filestorage.single('imgUrl'), async (req, res) => {
    try {
        let data = new image({
            imgUrl: port + 'uploads/' + req.file.filename,
        });
        if(!data){return res.status(403).send({message: 'Something went wrong'})}
        let result = await data.save();
        res.send({
            message: 'image uploaded successfully',
            data: result
        });
    }
    catch (ex) {
        res.send(ex.message);
    }
});

module.exports = router;