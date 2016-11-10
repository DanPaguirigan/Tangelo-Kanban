var express = require('express');
var router = express.Router();

var cardModel = require('../../models/card');
var listModel = require('../../models/list');
var boardModel = require('../../models/board');

var objectRepository = {
    cardModel: cardModel,
    boardModel: boardModel,
    listModel: listModel
};

var addCardMW = require('../../middleware/card/add');
var listCardsMW = require('../../middleware/card/list');
var getCardMW = require('../../middleware/card/get');
var editCardMW = require('../../middleware/card/edit');
var removeCardMW = require('../../middleware/card/delete');
var moveCardMW = require('../../middleware/card/move');
var orderCardMW = require('../../middleware/card/reorder');
var commentOnCardMW = require('../../middleware/card/comment');
var getComments = require('../../middleware/card/getComments');

var getListId = require('../../middleware/listIdFromCardId');
var getBoardId = require('../../middleware/boardIdFromListId');
var memberCheck = require('../../middleware/auth/memberCheck');


/* GET home page. */
router.get('/get/:cardId',
    getListId(objectRepository),
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    getCardMW(objectRepository),
    function (req, res, next) {
        res.json(res.card);
    });

router.get('/list',
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    listCardsMW(objectRepository),
    function (req, res, next) {
        res.json(res.cards);
    });

router.post('/add',
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    addCardMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.post('/edit/:cardId',
    getListId(objectRepository),
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    editCardMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.post('/move/:cardId',
    getListId(objectRepository),
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    moveCardMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.post('/order/:listId',
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    orderCardMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });


router.post('/remove/:cardId',
    getListId(objectRepository),
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    removeCardMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.post('/comment/:cardId',
    getListId(objectRepository),
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    commentOnCardMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.get('/comments/:cardId',
    getListId(objectRepository),
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    getComments(objectRepository),
    function (req, res, next) {
        res.json(res.comments);
    });

router.put('/edit/:cardId', function (req, res, next) {
    res.sendStatus(200);
});

module.exports = router;
