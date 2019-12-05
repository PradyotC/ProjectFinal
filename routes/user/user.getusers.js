let express  = require('express');
let reg = require('../../db/user/user.register.schema');
let router = express.Router();
router.get('/getusers', async(req,res) => {
    try {
        let users = await reg.register.find({},{_id:0}).select(['firstName','UserLogin.userEmail']);
        if (!users) { return res.status(402).send({ message: 'database empty' }) }
        res.send(users);
    }
    catch(ex) {
        res.send(ex.message);
    }
});

module.exports=router;