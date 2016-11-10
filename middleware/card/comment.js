module.exports = function (objectrepository) {
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {
        cardModel.findByIdAndUpdate(req.params.cardId, {
                $push: {
                    "comments": {
                        _user: req.user._doc._id,
                        comment: req.body.comment
                    }
                }
            },
            function (err) {
                if (err) {
                    return next(new Error('An error occurred while listing your applications.'));
                } else {
                    return next();
                }
            });
    };
};