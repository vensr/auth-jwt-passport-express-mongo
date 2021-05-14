const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../model/user');

// user registration
passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                // check if email is already registered
                const existingUser = await UserModel.findOne({ email });
                // return error if registered
                if (existingUser) {
                    return done(null, { error: true });
                } else {
                    // create and return user details otherwise
                    const user = await UserModel.create({ email, password });
                    return done(null, user);
                }
            } catch (error) {
                done(error);
            }
        }
    )
);

// user login
passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'User not found. Please register to login.' });
                }

                if (!await user.isPasswordValid(password)) {
                    return done(null, false, { message: 'Wrong Username or Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

// extract token from the user request
passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);
