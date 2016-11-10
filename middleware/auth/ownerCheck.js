module.exports = function (objectrepository) {
    var boardModel = objectrepository.boardModel;
    return function (req, res, next) {
        var boardId = req.params.boardId || req.body.boardId || res.boardId;
        boardModel.findOne({_id:boardId,_owner:req.user._doc._id}
            , function (err, results) {
                if (err) {
                    return next(new Error('An error occurred while boarding your applications.'));
                } else {
                    if(!results || results.length ==0){
                        res.sendStatus(401);
                    }else{
                        return next();
                    }
                }
            });
    }
};