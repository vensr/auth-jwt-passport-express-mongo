// environmental variables initialization
const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');


// connect to the db
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

// include auth
require('./auth/auth');

// include public and secure routes
const publicRoutes = require('./routes/public-routes');
const secureRoute = require('./routes/secure-routes');

// create express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup cors
app.use(cors());


// add public and secure routes with jwt auth
app.use('/', publicRoutes);
app.use('/profile', passport.authenticate('jwt', { session: false }), secureRoute);

// validation related errors
app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        res.status(400).json({
            type: err.type,
            message: err.error.toString()
        });
    } else {
        next(err);
    }
});

// handle all errors
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(3000, () => {
    console.log('Auth Server Started.')
});
