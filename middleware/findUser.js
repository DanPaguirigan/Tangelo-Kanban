module.exports = function (objectrepository) {
    var userModel = objectrepository.userModel;
    return function (req, res, next) {
        userModel.findOne({username:req.body.member}).exec(function (err, result) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                req.member = result;
                return next();
            }
        });
    };
};