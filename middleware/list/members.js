module.exports = function (objectrepository) {
    var listModel = objectrepository.listModel;
    var userModel = objectrepository.userModel;
    return function (req, res, next) {
        listModel.findById(req.params.listId).populate('_board').exec(function (err, result) {
            if (err) {
                return next(new Error('An error occurred while listing your applications.'));
            } else {
                
                userModel.populate(result,"_board._members",function(err,output) {
                    if (err) throw err; // or do something

                    res.members = output._board._members;
                    return next();
                });
            }
        });
    };
};