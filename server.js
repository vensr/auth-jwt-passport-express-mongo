// environmental variables initialization
const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const passport = require('passport');
const cors = require('cors');

// authorizer to check for admin role
const authorize = require("./auth/authorize");


// include db
require('./config/db')

// include auth
require('./auth/auth');

// include public and secure routes
const publicRoutes = require('./routes/public-routes');
const secureRoute = require('./routes/secure-routes');
const adminRoute = require('./routes/admin-routes');

// create express app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup cors
app.use(cors());

// add public and secure routes with jwt auth
app.use('/', publicRoutes);
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/admin', [passport.authenticate('jwt', { session: false }), authorize()], adminRoute);

// handle all errors
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(3000, () => {
    console.log('Auth Server Started.')
});
