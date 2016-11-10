var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var conf = require('../../config.json');


var board = require('./board');
var list = require('./list');
var card = require('./card');

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});


var jwtCheck = jwt({
    secret: conf.jwtSecret
});

router.use('/',jwtCheck);

router.use('/board',board);
router.use('/list',list);
router.use('/card',card);

module.exports = router;