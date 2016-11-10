(function () {
    'use strict';

    angular.module('app.kanban.board')

        .controller('BoardController', function ($mdDialog, $scope, $route, $routeParams, $location, $http, boardService) {

            var showAlert = function (err) {

                var message = {};
                message.title = "Error"
                if (err.status == 401) {
                    message.text = "Unauthorized"
                } else if (err.status == 404) {
                    message.text = "Not Found"

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


            boardService.fetchBoards().then(function (boards) {
                $scope.boards = boards
            }, showAlert);

            $scope.$watch(function () {
                return boardService.getBoards();
            }, function (boards) {
                $scope.boards = boards;
            });

            $scope.update = function () {
                boardService.fetchBoards().then(function (boards) {
                    $scope.boards = boards
                }, showAlert);
            };

            $scope.deleteBoard = function (boardId) {
                boardService.deleteBoard(boardId).then($scope.update, showAlert);
            };

            $scope.leaveBoard = function (boardId) {
                boardService.leaveBoard(boardId).then($scope.update, showAlert);
            };

            $scope.manageMembers = function (boardId) {
                $mdDialog.show({
                    templateUrl: 'app/components/board/member/member.html',
                    controller: 'MemberController',
                    controllerAs: 'ctrl',
                    parent: angular.element(document.body),
                    targetEvent: null,
                    clickOutsideToClose: true,
                    resolve: {
                        boardId: function () {
                            return boardId;
                        }
                    }
                }).then(function (answer) {
                    $scope.update();
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
            };

            $scope.renameBoardDialog = function (board) {
                $mdDialog.show({
                    controller: RenameBoardCtrl,
                    controllerAs: 'ctrl',
                    templateUrl: 'app/components/board/renameDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: null,
                    clickOutsideToClose: true,
                    resolve: {
                        board: function () {
                            return board;
                        }
                    }
                }).then(function (answer) {
                    $scope.update();
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
            };

            function RenameBoardCtrl($timeout, $q, $scope, $mdDialog, boardService, board) {
                var self = this;
                $scope.title = board.title;

                self.cancel = function ($event) {
                    $mdDialog.cancel();
                };
                self.finish = function ($event) {
                    boardService.renameBoard(board._id, $scope.title).then(function () {
                        $mdDialog.hide()
                    }, showAlert);

                };
            }

            $scope.addBoardDialog = function ($event) {
                $mdDialog.show({
                    controller: NewBoardCtrl,
                    controllerAs: 'ctrl',
                    templateUrl: 'dialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true
                }).then(function (answer) {
                    $scope.update();
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
            };

            function NewBoardCtrl($timeout, $q, $scope, $mdDialog, boardService) {
                var self = this;
                $scope.isListControl = false;
                $scope.dialogTitle = "New Board";
                $scope.dialogFieldName = "Board name";

                self.cancel = function ($event) {
                    $mdDialog.cancel();
                };
                self.finish = function ($event) {
                    boardService.addBoard($scope.title).then(function () {
                        $mdDialog.hide()
                    }, showAlert);

                };
            }

        });

})();