const mongoose = require('mongoose');

// connect to the db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;
