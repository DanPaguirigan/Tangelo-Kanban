module.exports = function (objectrepository) {
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {
        cardModel.findByIdAndRemove(req.params.cardId).exec(function (err) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                return next();
            }
        });
    };
};