module.exports = function (objectrepository) {
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {
        cardModel.findById(req.params.cardId).populate('comments._user').exec(function (err, result) {
            if (err) {
                console.log(err);
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                console.log(result);
                res.comments = result.comments;
                return next();
            }
        });
    };
};