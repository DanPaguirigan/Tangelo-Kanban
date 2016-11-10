module.exports = function (objectrepository) {
    var boardModel = objectrepository.boardModel;
    return function (req, res, next) {
        boardModel.findById(req.params.boardId).populate('_members').exec(function (err, result) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                res.members = result._members;
                return next();
            }
        });
    }
};