let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Project', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`connected to the database`))
    .catch(err => console.log(`something went wrong ${err.message}`));
