const express = require('express');
const router = express.Router();

const UserModel = require("../model/user")

router.get(
    '/profile',
    (req, res, next) => {
        UserModel.findById(req.user._id).exec(
            (error, user) => {
                res.json({
                    message: 'Secure Profile Information',
                    user: user,
                    // extract token from "Bearer token"
                    token: req.headers.authorization.split(" ")[1]
                })

            }
        );
    }
);

router.get(
    '/isadmin',
    (req, res, next) => {
        UserModel.findById(req.user._id).exec(
            async (error, user) => {
                res.json({
                    message: 'Admin Information',
                    admin: await user.isAdmin(),
                })

            }
        );
    }
);

module.exports = router;
