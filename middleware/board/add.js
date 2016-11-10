module.exports = function (objectrepository) {
    var boardModel = objectrepository.boardModel;
    return function (req, res, next) {
        var board = new boardModel();
        board.title = req.body.title;
        board._owner = res.userId;
        board._members = [res.userId];
        board.save(function (err) {
            if (err) {
                console.log(err);
                return next(new Error("Failed to add card"));
            } else {
                return next();
            }
        });
    }
};