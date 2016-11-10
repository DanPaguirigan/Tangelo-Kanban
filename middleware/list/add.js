module.exports = function (objectrepository) {
    var listModel = objectrepository.listModel;
    return function (req, res, next) {
        var list = new listModel();
        list.title=req.body.title;
        list.priority=req.body.priority;
        list._board = req.body.boardId;
        list.save(function (err) {
            if (err) {
                return next(new Error("Failed to add list"));
            } else {
                return next();
            }
        });
    }
};