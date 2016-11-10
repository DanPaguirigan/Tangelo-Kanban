var express = require('express');
var router = express.Router();

var jwt    = require('jsonwebtoken');
var passport = require('passport');
var Account = require('../../models/user');
var conf = require('../../config.json');

router.post('/',
    passport.authenticate('local'),
    function (req, res) {
        var token = jwt.sign(req.user, conf.jwtSecret, {
            expiresIn: 60*60*24 // expires in 24 hours
        });
        console.log(token);
        // return the information including token as JSON
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    });

router.post('/signup',
    function (req, res, next) {
        var accountData = {
            username:req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };
        console.log(accountData)
        Account.register(new Account(accountData),
            req.body.password,
            function (err) {
                if (err) {
                    return next(new Error('Error while registering user!'));
                }
                res.sendStatus(200);
            }
        );
    }
);

module.exports = router;