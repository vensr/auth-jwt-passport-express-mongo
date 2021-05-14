const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// create validator for validating inputs
const schemas = require('../validation/schemas');
const validator = require('../validation/validator');

router.post(
    '/register',
    [validator(schemas.userLogin), passport.authenticate('register', { session: false })],
    async (req, res, next) => {
        res.json({
            message: 'Registration is successful',
            user: req.user
        });
    }
);


router.post(
    '/login',
    validator(schemas.userRegistration),
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {

                    // error scenario
                    if (err || !user) {
                        return next(new Error('An error occurred while logging in.'));
                    }

                    req.login(
                        user,
                        { session: false }, // user has to send the token everytime and its not saved
                        async (error) => {

                            // login error with invalid details
                            if (error) return next(error);

                            // login successful, generate the JWT token
                            const body = { _id: user._id, email: user.email };
                            const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            }
        )(req, res, next);
    }
);

module.exports = router;
