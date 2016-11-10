module.exports = function (objectrepository) {
    var boardModel = objectrepository.boardModel;
    return function (req, res, next) {
        boardModel.findByIdAndUpdate(req.body.boardId, {$pull: {"_members": req.body.memberId}},
            function (err, item) {
                if (err) {
                    return next(new Error("Failed to add member to board"));
                } else {
                    return next();
                }
            });
    };
};