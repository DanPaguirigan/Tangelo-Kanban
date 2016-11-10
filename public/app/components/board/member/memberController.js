(function () {
    'use strict';

    angular.module('app.kanban.board.member')

        .controller('MemberController', function ($timeout, $q, $scope, $mdDialog, memberService, boardId) {
            var showAlert = function (err) {
                var message = {};
                message.title = "Error";
                if (err.status == 401) {
                    message.text = "Unauthorized"
                } else if (err.status == 500) {
                    message.text = "Internal Server Error";
                } else {
                    console.log(err.message);
                    message.text = "Unknown Error";
                }
                $mdDialog.show(
                    $mdDialog.alert({title: message.title, textContent: message.text, ok: 'Close'})
                );
            };

            var self = this;

            memberService.getMembers(boardId).then(function (data) {
                $scope.members = data;
            }, showAlert);

            $scope.removeMember = function (memberId) {
                memberService.removeMember(boardId,memberId ).then(function () {
                    $mdDialog.hide();
                }, showAlert);
            };

            self.cancel = function ($event) {
                $mdDialog.cancel();
            };
            self.finish = function ($event) {
                memberService.addMember(boardId, $scope.username).then(function () {
                    $mdDialog.hide();
                }, showAlert);

            };

        });

})();