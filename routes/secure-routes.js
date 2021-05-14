const express = require('express');
const router = express.Router();

router.get(
    '/profile',
    (req, res, next) => {
        res.json({
            message: 'Secure Profile Information',
            user: req.user,
            // extract token from "Bearer token"
            token: req.headers.authorization.split(" ")[1]
        })
    }
);

module.exports = router;
