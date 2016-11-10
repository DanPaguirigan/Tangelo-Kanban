var express = require('express');
var router = express.Router();

var listModel = require('../../models/list');
var cardModel = require('../../models/card');
var userModel = require('../../models/user');
var boardModel = require('../../models/board');

var objectRepository = {
    listModel: listModel,
    userModel: userModel,
    cardModel: cardModel,
    boardModel: boardModel
};

var addListMW = require('../../middleware/list/add');
var listListsMW = require('../../middleware/list/list');
var getMembersMW = require('../../middleware/list/members');
var listCardsByBoardMW = require('../../middleware/card/listByBoard');
var editListMW = require('../../middleware/list/edit');
var removeListMW = require('../../middleware/list/delete');


var getBoardId = require('../../middleware/boardIdFromListId');
var memberCheck = require('../../middleware/auth/memberCheck');

router.get('/:boardId',
    memberCheck(objectRepository),
    listListsMW(objectRepository),
    function (req, res, next) {
        res.json(res.lists);
    });

router.post('/add',
    memberCheck(objectRepository),
    addListMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.post('/remove/:listId',
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    removeListMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.post('/edit/:listId',
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    editListMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.get('/cards/:listId',
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    listCardsByBoardMW(objectRepository),
    function (req, res, next) {
        res.json(res.cards);
    });

router.get('/members/:listId',
    getBoardId(objectRepository),
    memberCheck(objectRepository),
    getMembersMW(objectRepository),
    function (req, res, next) {
        console.log(res.members);
        res.json(res.members);
    });

module.exports = router;
