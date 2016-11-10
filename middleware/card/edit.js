module.exports = function (objectrepository) {
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {
        cardModel.findByIdAndUpdate(req.params.cardId, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                _assignee: req.body._assignee,
                due: req.body.due,
                tasks: req.body.tasks
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