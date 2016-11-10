module.exports = function (objectrepository) {
    var boardModel = objectrepository.boardModel;
    return function (req, res, next) {
        console.log(req.body.boardId);
        boardModel.findByIdAndUpdate(req.body.boardId, {$push: {"_members": req.member._id}},
            function (err, item) {
                if (err) {
                    return next(new Error("Failed to add member to board"));
                } else {
                    return next();
                }
            });
    };
};