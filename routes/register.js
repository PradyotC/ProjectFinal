let express  = require('express');
let reg = require('../db/register.schema');
let router = express.Router();

router.post('/register', async(req,res) => {
    try {
        let { error } = reg.validateError(req.body);
        if (error) { return res.status(403).send(error.details[0].message) }
        let user = await reg.register.findOne({ "UserLogin.userEmail": req.body.UserLogin.userEmail });
        if (user) { return res.status(402).send({ message: 'this email id is already exists' }) }
        let data = new reg.register({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            UserLogin:req.body.UserLogin,
            termsAcceptCheck: req.body.termsAcceptCheck,
            isAdmin: req.body.isAdmin,
        });
        let result = await data.save();
        res.send({
            message:'Registeration Successfull',
            item: result
        })
    }
    catch(ex) {
        res.send(ex.message);
    }
});

module.exports=router;