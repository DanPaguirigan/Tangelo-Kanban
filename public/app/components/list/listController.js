(function () {
    'use strict';

    angular.module('app.kanban.list')
        .controller('ListController', function (store, $mdDialog, $scope, $state, $stateParams, $route, $routeParams, $location, $http, listService) {

            var showAlert = function (err) {
                // Appending dialog to document.body to cover sidenav in docs app
                // Modal dialogs should fully cover application
                // to prevent interaction outside of dialog
                var message = {};
                message.title = "Board unavailable"
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

            $scope.boardId = $stateParams.boardId;
            $scope.addNewCard = false;
            $scope.kanbanSortOptions = {

                //restrict move across columns. move only within column.
                /*accept: function (sourceItemHandleScope, destSortableScope) {
                 return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
                 },*/
                itemMoved: function (event) {
                    var index = event.dest.index;
                    var cardId = event.dest.sortableScope.$parent.list.cards[index]._id;
                    var listId = event.dest.sortableScope.$parent.list._id;
                    listService.moveCard(cardId, listId);
                },
                orderChanged: function (event) {
                    var i = 0;
                    var order = [];
                    event.dest.sortableScope.modelValue.forEach(function (item) {
                        var obj = {
                            cardId: item._id,
                            position: i
                        };
                        order.push(obj);
                        i++;
                    });
                    var listId = event.dest.sortableScope.$parent.list._id;
                    listService.moveCardInList(listId, order);
                },
                containment: '#board'
            };

            listService.fetchLists($scope.boardId).then(function (lists) {
                $scope.lists = lists;
            }, function (err) {
                showAlert(err);
                $state.go('boards');
            });

            $scope.$watch(function () {
                return listService.getLists();
            }, function (lists) {
                $scope.lists = lists;
            });

            $scope.update = function () {
                listService.fetchLists($scope.boardId).then(function (lists) {
                    $scope.lists = lists
                }, function (err) {
                    showAlert(err);
                });
            };

            $scope.addCard = function (boardId, title) {
                listService.addCard(boardId, title).then($scope.update, function (err) {
                    showAlert(err);
                });
            };

            $scope.removeList = function (listId) {
                listService.removeList(listId).then($scope.update, function (err) {
                    showAlert(err);
                })
            };
            $scope.removeCard = function (cardId) {
                listService.removeCard(cardId).then($scope.update, function (err) {
                    showAlert(err);
                });
            };

            $scope.showCard = function (ev, card, boardId) {
                $mdDialog.show({
                    controller: CardController,
                    templateUrl: 'app/components/card/card.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    resolve: {
                        card: function () {
                            return card;
                        }
                    }
                })
                    .then(function (answer) {
                        $scope.update();
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };

            $scope.newList = function ($event, boardId) {
                $mdDialog.show({
                    controller: AddListCtrl,
                    controllerAs: 'ctrl',
                    templateUrl: 'dialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    resolve: {
                        boardId: function () {
                            return boardId;
                        }
                    }
                })
                    .then(function (answer) {
                        $scope.update();
                    }, function () {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };

            function AddListCtrl($timeout, $q, $scope, $mdDialog, listService, boardId) {
                var self = this;
                $scope.dialogTitle = "Add new list";
                $scope.dialogFieldName = "List name";
                $scope.isListControl = true;
                $scope.priority = 1;
                $scope.boardId = boardId;

                // ******************************
                // Template methods
                // ******************************
                self.cancel = function ($event) {
                    $mdDialog.cancel();
                };
                self.finish = function ($event) {
                    listService.addList($scope.title, $scope.priority, $scope.boardId);
                    $mdDialog.hide();
                };
            }

            $scope.editListDialog = function (list) {
                $mdDialog.show({
                    controller: EditListCtrl,
                    controllerAs: 'ctrl',
                    templateUrl: 'app/components/list/editListDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: null,
                    clickOutsideToClose: true,
                    resolve: {
                        list: function () {
                            return list;
                        }
                    }
                }).then(function (answer) {
                    $scope.update();
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
            };

            function EditListCtrl($timeout, $q, $scope, $mdDialog, listService, list) {
                var self = this;
                $scope.title = list.title;
                $scope.priority = list.priority;

                self.cancel = function ($event) {
                    $mdDialog.cancel();
                };
                self.finish = function ($event) {
                    listService.editList($scope.title, $scope.priority, list._id).then(function () {
                        $mdDialog.hide()
                    });

                };
            }

            function CardController(store, $scope, $mdDialog, card, listService) {
                $scope.card = card;

                listService.getComments(card._id).then(function (data) {
                    $scope.comments = data;
                }, showAlert);

                listService.getMembers(card._parent).then(function (data) {
                    $scope.members = data;
                });


                $scope.remove = function (cardId) {
                    listService.removeCard(cardId);
                    $mdDialog.hide();
                };

                $scope.edit = function (cardId, card) {

                    listService.editCard(cardId, card);
                    $mdDialog.hide();
                };

                $scope.addTask = function () {
                    var taskToAdd = {
                        name: $scope.newTask,
                        completed: false
                    };
                    $scope.card.tasks.push(taskToAdd);
                    $scope.newTask = null;
                };

                $scope.removeTask = function (id) {
                    $scope.card.tasks.splice(id, 1);
                };

                $scope.commentOnCard = function () {
                    listService.commentOnCard($scope.card._id, $scope.newComment).then(function (data) {
                        $scope.comments.push({_user: {username: store.get("username")}, comment: $scope.newComment});
                        $scope.newComment = null;
                    }, showAlert);
                };

                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            }
        });


})();