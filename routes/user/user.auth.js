let express = require('express');
let router = express.Router();
let joi = require('@hapi/joi');
let bcrypt = require('bcryptjs');
let userlogin = require('../../db/user/user.register.schema');
router.post('/auth' , async(req,res) => {
    try
    {
        let user = await userlogin.register.findOne({"UserLogin.userEmail": req.body.UserLogin.userEmail});
        if(!user){ return res.status(403).send({message:'Invalid EmailId'})}
        let {error} = validateError(req.body);
        if(error) { return res.status(403).send(error.details[0].message)};
        let password = await bcrypt.compare(req.body.UserLogin.userPassword, user.UserLogin.userPassword);
        if(!password) {return res.status(403).send({message:'Invalid Password'})}
        let token = user.generateToken();
        res.send({message:'login successful',data:token});
    }
    catch(ex)
    {
        res.send(ex.message);
    }
});

function validateError(error) {
    let authSchema = joi.object({
        UserLogin:{
            userEmail: joi.string().required().min(5).max(250),
            userPassword: joi.string().required()
        }
    })
    return authSchema.validate(error);
}


module.exports = router;