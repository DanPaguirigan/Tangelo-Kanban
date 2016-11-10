module.exports = function (objectrepository) {
    var listModel = objectrepository.listModel;
    var cardModel = objectrepository.cardModel;
    var boardModel = objectrepository.boardModel;
    return function (req, res, next) {

        listModel.find({_board: req.params.boardId},
            function (err, items) {
                if(err){
                    console.log(err);
                }else{
                    var listIds= [];

                    items.forEach(function (item) {
                        listIds.push(item._id);
                    });
                    console.log(listIds);
                    cardModel.remove({_parent:{$in: listIds}}, function (err) {
                        if (err) {
                            return next(new Error('Failed to remove cards of lists of boards'));
                        } else {
                            return removeListsCallbacks();
                        }
                    });
                }
            });




        var removeListsCallbacks = function () {
            listModel.remove({_board: req.params.boardId}).exec(function (err) {
                if (err) {
                    return next(new Error('Failed to remove lists of boards'));
                } else {
                    return removeBoardCallback();
                }
            });
        };

        var removeBoardCallback = function () {
            boardModel.findByIdAndRemove(req.params.boardId).exec(function (err) {
                if (err) {
                    return next(new Error('Failed to remove boards'));
                } else {
                    return next();
                }
            });
        };
    };
};