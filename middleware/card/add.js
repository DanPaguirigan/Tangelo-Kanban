module.exports = function (objectrepository) {
    var cardModel = objectrepository.cardModel;
    return function (req, res, next) {
        var card = new cardModel();
        card.title = req.body.title;
        card._parent = req.body.listId;
        //TODO
        card.position = 0;
        card.save(function (err) {
            if (err) {
                return next(new Error("Failed to add card"));
            } else {
                return next();
            }
        });
    }
};