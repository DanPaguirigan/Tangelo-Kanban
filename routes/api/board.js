var express = require('express');
var router = express.Router();

var boardModel = require('../../models/board');
var cardModel = require('../../models/card');
var listModel = require('../../models/list');
var userModel = require('../../models/user');

var objectRepository = {
    boardModel: boardModel,
    cardModel:cardModel,
    listModel: listModel,
    userModel: userModel
};

var lookupUser = require('../../middleware/lookUpUser');
var addBoardMW = require('../../middleware/board/add');
var listBoardsMW = require('../../middleware/board/list');
var deleteBoardMW = require('../../middleware/board/delete');
var renameBoardMW = require('../../middleware/board/rename');
var findMember= require('../../middleware/findUser');
var ownerCheck= require('../../middleware/auth/ownerCheck');
var addMemberMW = require('../../middleware/board/addMember');
var removeMemberMW = require('../../middleware/board/removeMember');
var getMembersMW = require('../../middleware/board/getMembers');


router.get('/',
    lookupUser(),
    listBoardsMW(objectRepository),
    function (req, res, next) {
        res.json(res.boards);
    });

router.post('/add',
    lookupUser(),
    addBoardMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.post('/remove/:boardId',
    lookupUser(),
    ownerCheck(objectRepository),
    deleteBoardMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });
router.post('/rename/:boardId',
    lookupUser(),
    ownerCheck(objectRepository),
    renameBoardMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.post('/leave/:boardId',
    lookupUser(),
    function(req,res,next){
        req.body.memberId =req.user._doc._id;
        req.body.boardId =req.params.boardId;
        return next();
    },
    removeMemberMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.post('/members/add',
    ownerCheck(objectRepository),
    findMember(objectRepository),
    addMemberMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.post('/members/remove',
    ownerCheck(objectRepository),
    removeMemberMW(objectRepository),
    function (req, res, next) {
        res.sendStatus(200);
    });

router.get('/members/list/:boardId',
    ownerCheck(objectRepository),
    getMembersMW(objectRepository),
    function (req, res, next) {
        console.log(res.members);
        res.json(res.members);
    });

module.exports = router;
