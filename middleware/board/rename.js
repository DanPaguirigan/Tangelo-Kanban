module.exports = function (objectrepository) {
    var boardModel = objectrepository.boardModel;
    return function (req, res, next) {
        boardModel.findByIdAndUpdate(req.params.boardId, {title: req.body.title}
            , function (err, results) {
                if (err) {
                    return next(new Error('An error occurred while boarding your applications.'));
                } else {
                    res.boards = results;
                    return next();
                }
            });
    }
};