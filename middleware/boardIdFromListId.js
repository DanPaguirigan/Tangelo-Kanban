module.exports = function (objectrepository) {
    var listModel = objectrepository.listModel;
    return function (req, res, next) {
        var listId = req.params.listId || req.body.listId  || res.listId;
        listModel.findById(listId).exec(function (err, result) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                if(result){
                    res.boardId = result._board;
                    return next();
                }else{
                    return next(new Error('No such list'));
                }

            }
        });
    };
};