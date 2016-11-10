module.exports = function (objectrepository) {
    var boardModel = objectrepository.boardModel;
    return function (req, res, next) {
        boardModel.find({$or: [{_owner: res.userId}, {_members: res.userId}]})
            .populate('_owner')
            .populate('_members')
            .exec(function (err, results) {
                if (err) {
                    return next(new Error('An error occurred while boarding your applications.'));
                } else {
                    res.boards = results;
                    return next();
                }
            });
    };
};