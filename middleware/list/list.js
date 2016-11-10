module.exports = function (objectrepository) {
    var listModel = objectrepository.listModel;
    return function (req, res, next) {
        listModel.find({_board:req.params.boardId}).exec(function (err, results) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                res.lists = results;
                return next();
            }
        });
    };
};