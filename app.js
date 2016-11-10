var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var helmet = require('helmet');

var api = require('./routes/api');
var auth = require('./routes/api/auth');
var app = express();

app.use(helmet());

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
//FIXME: is this needed?
app.use(passport.session());

var Account = require('./models/user');
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

cors = require('cors');
app.use(cors());

app.use('/api', api);
app.use('/auth',auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.sendStatus(err.status || 500);
});


module.exports = app;
