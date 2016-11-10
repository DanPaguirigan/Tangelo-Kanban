module.exports = function (objectrepository) {
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {
        var cardId = req.params.cardId || req.body.cardId  || res.cardId;
        cardModel.findById(cardId).exec(function (err, result) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                res.listId = result._parent;
                return next();
            }
        });
    };
};