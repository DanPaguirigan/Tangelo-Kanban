module.exports = function (objectrepository) {
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {
        var hadErrors = false;
        var left = req.body.position.length;
        console.log(left)
        req.body.position.forEach(function (card) {
            cardModel.findOneAndUpdate({_id:card.cardId,_parent:req.params.listId}, {
                $set: {
                    positionInList: card.position
                }
            }, function (err) {
                if (err) {
                    hadErrors = true;
                    console.log(err);
                }
                left--;
                if(left == 0){
                    callBack();
                }
            });
        });

        var callBack = function(){
            if(hadErrors){
                return next(new Error("Had some errors saving order"));
            }else{
                return next();
            }
        }

    };
};