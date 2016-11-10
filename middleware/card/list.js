module.exports = function (objectrepository) {
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {
        cardModel.find({_parent:req.body.listId}).exec(function (err, results) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                res.cards = results;
                return next();
            }
        });
    };
};