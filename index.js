let express = require('express');
let register = require('./routes/user.register');
let auth = require('./routes/user.auth');
let forgotpassword = require('./routes/user.forgotpassword.mailer');
let resetpassword = require('./routes/user.resetpassword');
let app = express();
let mongoose = require('mongoose');
let port = 4500;
app.use(express.json());
mongoose.connect("mongodb://localhost/Project",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connection Sucessful"))
.catch(ex=> console.log(`Wrong connection ${ex.message}`));
app.use('/api/users/',register);
app.use('/api/users/login/',auth);
app.use('/api/users/',forgotpassword);
app.use('/api/users/',resetpassword);
app.listen(port, () => console.log(`this app is working on port number ${port}`));