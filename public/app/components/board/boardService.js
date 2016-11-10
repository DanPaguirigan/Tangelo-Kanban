(function () {
    'use strict';
    angular.module('app.kanban.board', ['app.kanban.board.member'])

        .factory('boardService', function ($http) {
            var boards = [];
            var fetchBoards = function () {
                return $http({
                    url: 'api/board',
                    method: "GET"
                })
                    .then(function (result) {
                        boards = result.data;
                        return boards;
                    });
            };
            return {
                fetchBoards: fetchBoards,
                getBoards: function () {
                    return boards;
                }, deleteBoard: function (boardId) {
                    return $http.post('api/board/remove/' + boardId)
                        .then(function (result) {
                            //resolve the promise as the data
                            return result;
                        });
                }, addBoard: function (title) {
                    var data = JSON.stringify({title: title});
                    return $http.post('api/board/add/', data)
                        .then(function (result) {
                            //resolve the promise as the data
                            return result;
                        });
                }, renameBoard: function (boardId, title) {
                    var data = JSON.stringify({title: title});
                    return $http.post('api/board/rename/' + boardId, data)
                        .then(function (result) {
                            //resolve the promise as the data
                            return result;
                        });
                }, leaveBoard: function (boardId, title) {
                    return $http.post('api/board/leave/' + boardId)
                        .then(function (result) {
                            //resolve the promise as the data
                            return result;
                        });
                }


            };
        })
})();