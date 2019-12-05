let express = require("express");
let router = express.Router();
let contact = require('../../db/contact/contact.schema');
router.post('/contact', async (req, res) => {
    try {
        let { error } = contact.validateError(req.body);
        if (error) { return res.status(401).send(error.details[0].message); }
        let data = new contact.contactMessage({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        let token = data.generateToken();
        await data.save();
        res.send({ message: 'Message sent successfully', token: token });
    }
    catch (ex) {
        res.send(ex.message);
    }
});

module.exports = router;