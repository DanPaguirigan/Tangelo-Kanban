module.exports = function () {
    return function (req, res, next) {
        res.userId= req.user._doc._id;
        return next();
    }
};