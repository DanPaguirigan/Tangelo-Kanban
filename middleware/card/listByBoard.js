module.exports = function (objectrepository) {
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {
        cardModel.find({_parent:req.params.listId}).sort('positionInList').populate('_assignee').exec(function (err, results) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                res.cards = results;
                return next();
            }
        });
    };
};