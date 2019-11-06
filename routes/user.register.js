let express  = require('express');
let reg = require('../db/user.register.schema');
let router = express.Router();
let bcrypt = require('bcryptjs');
router.post('/register', async(req,res) => {
    try {
        let { error } = reg.validateError(req.body);
        if (error) { return res.status(403).send(error.details[0].message) }
        let user = await reg.register.findOne({ "UserLogin.userEmail": req.body.UserLogin.userEmail });
        if (user) { return res.status(402).send({ message: 'this email id is already exists' }) }
        let data = new reg.register({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            newsLetterCheck:req.body.newsLetterCheck,
            UserLogin:req.body.UserLogin,
            termsAcceptCheck: req.body.termsAcceptCheck,
            resetPasswordToken: req.body.resetPasswordToken,
            resetPasswordExpires: req.body.resetPasswordExpires,
            isAdmin: req.body.isAdmin,
        });
        let salt = await bcrypt.genSalt(10);
        data.UserLogin.userPassword = await bcrypt.hash(data.UserLogin.userPassword, salt);
        let token = data.generateToken();
        let result = await data.save();
        res.send({
            message:'Registeration Successfull',
            item: result,
            token:token
        })
    }
    catch(ex) {
        res.send(ex.message);
    }
});

module.exports=router;