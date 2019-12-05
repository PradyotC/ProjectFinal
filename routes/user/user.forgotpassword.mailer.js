let express = require('express');
let router = express.Router();
const crypto = require('crypto');
let users = require('../../db/user/user.register.schema');
let nodemailer = require('nodemailer');
router.post('/forgotpassword', async (req, res) => {
    try {
        let token = crypto.randomBytes(32).toString('hex');
        let user = await users.register.findOne({ "UserLogin.userEmail": req.body.UserLogin.userEmail });
        if (!user) { return res.status(401).send({ message: 'Invalid emailId' }) }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        user = await user.save();
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'pradyot.o.c@gmail.com',
                pass: 'PraKPC@331'
            }
        });

        if (!transporter) { return res.status(401).send({ message: 'Something went wrong' }) }

        let mailOptions = {
            from: '"Demo:" <pradyot.o.c@gmail.com>',
            to: user.UserLogin.userEmail,
            subject: 'Reset your password',
            text: 'open this link to change your password http://localhost:4500/api/users/resetpassword/' + token,
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
        });

        res.header('x-auth-token', token).status(200).send({ 'message': 'message send', 'token': token, 'data': user });
    }
    catch (ex) {
        res.send(ex.message);
    }
});


module.exports = router;