module.exports = function (objectrepository) {
    var listModel = objectrepository.listModel;
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {

        cardModel.remove({_parent: req.params.listId}, function (err) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                return callback();
            }
        });

        var callback = function () {
            listModel.findByIdAndRemove(req.params.listId).exec(function (err) {
                if (err) {
                    return next(new Error('An error occurred while listing your applications.'));
                } else {
                    return next();
                }
            });
        }
    };
};