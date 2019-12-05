let express = require('express');
let image = require('./routes/image/uploadImage');
let register = require('./routes/user/user.register');
let auth = require('./routes/user/user.auth');
let forgotpassword = require('./routes/user/user.forgotpassword.mailer');
let contactus = require('./routes/contact/contact');
let resetpassword = require('./routes/user/user.resetpassword');
let getuser = require('./routes/user/user.getusers');
let getmessage = require('./routes/contact/getmessage');
let cartuploads = require('./routes/cart/cartItem');
let addSubCategory = require('./routes/product/addSubCategory');
let category = require('./routes/product/category');
let product = require('./routes/product/product');
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
app.use('/api/image/',image);
app.use('/api/users/',register);
app.use('/api/users/login/',auth);
app.use('/api/users/',forgotpassword);
app.use('/api/users/',resetpassword);
app.use('/api/contactUs',contactus);
app.use('/api/users/',getuser);
app.use('/api/contactUs/',getmessage);
app.use('/api/cart/', cartuploads);
app.use('/api/subCategory/',addSubCategory);
app.use('/api/category/',category);
app.use('/api/product/',product);
app.use('/uploads/',express.static('uploads'));
app.use(express.static('web'));
app.listen(port, () => console.log(`this app is working on port number ${port}`));