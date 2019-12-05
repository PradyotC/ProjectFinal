let express = require("express");
let router = express.Router();
let contact = require('../../db/contact/contact.schema');
let jwt = require('jsonwebtoken');
router.get('/message', async (req, res) => {
    try {
        let data = await contact.contactMessage.find({},{_id: 0}).select('message');
        if(!data){ return res.status(401).send({message:'Invalid request'})}
        res.send(data);
    }
    catch (ex) {
        res.send(ex.message);
    }
});
router.get('/message/:id', async (req, res) => {
    try {
        let id = jwt.verify(req.params.id, 'sshh');
        let data = await contact.contactMessage.findOne({"_id":id._id});
        if(!data){ return res.status(401).send({message:'Invalid request'})}
        res.send({message:data.message});
    }
    catch (ex) {
        res.send(ex.message);
    }
});
module.exports = router;