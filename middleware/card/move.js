module.exports = function (objectrepository) {
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {
        cardModel.findByIdAndUpdate(req.params.cardId, {
            $set: {
                _parent: req.body.listId
            }
        }, function (err) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                return next();
            }
        });
    };
};