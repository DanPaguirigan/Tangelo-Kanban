module.exports = function (objectrepository) {
    var listModel = objectrepository.listModel;
    return function (req, res, next) {
        listModel.findByIdAndUpdate(req.params.listId, {
            $set: {
                title: req.body.title,
                priority: req.body.priority
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