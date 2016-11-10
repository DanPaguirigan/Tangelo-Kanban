module.exports = function (objectrepository) {
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {
        cardModel.findById(req.params.cardId).populate('_assignee').exec(function (err, result) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                res.card = result;
                return next();
            }
        });
    };
};