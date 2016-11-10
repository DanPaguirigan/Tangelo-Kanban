(function () {
    'use strict';
    angular.module('app.kanban.board.member', [])

        .factory('memberService', function ($http) {
            var addMember = function (boardId, username) {
                return $http({
                    url: 'api/board/members/add',
                    method: "POST",
                    data: {member:username, boardId: boardId}
                })
                    .then(function (result) {
                        return result;
                    });
            };
            return {
                addMember: addMember,
                getMembers: function (boardId){
                    return $http({
                        url: 'api/board/members/list/' + boardId,
                        method: "GET"
                    }).then(function (result) {
                        //resolve the promise as the data
                        return result.data;
                    });
                },removeMember: function(boardId,memberId){
                    return $http({
                        url: 'api/board/members/remove',
                        method: "POST",
                        data: {memberId:memberId, boardId: boardId}
                    })
                        .then(function (result) {
                            return result;
                        });
                }
            };
        })
})();