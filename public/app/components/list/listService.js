(function () {
    'use strict';
    angular.module('app.kanban.list', [])
        .factory('listService', function ($http) {

            var lists = [];
            var fetchLists = function (boardId) {
                return $http({
                    url: 'api/list/' + boardId,
                    method: "GET"
                })
                    .then(function (result) {
                        lists = result.data;
                        lists.forEach(function (item) {
                            getCardsForList(item._id).then(function (cards) {

                                cards.forEach(function (card) {
                                    card.getCompleted = function () {
                                        if (card.tasks.length == 0) {
                                            card.completed = 0;
                                        } else {
                                            var completedCnt = 0;
                                            card.tasks.forEach(function (item) {
                                                if (item.completed) {
                                                    completedCnt++;
                                                }
                                            });
                                            card.completed =  completedCnt
                                        }
                                        return card.completed;
                                    };
                                    card.getCompletion = function () {
                                        if (card.tasks.length == 0) {
                                            card.completion = 0;

                                        } else {
                                            var completedCnt = 0;
                                            card.tasks.forEach(function (item) {
                                                if (item.completed) {
                                                    completedCnt++;
                                                }
                                            });
                                            card.completion = 100 * (completedCnt / card.tasks.length);
                                            card.completion = Math.round(card.completion)
                                        }
                                        return card.completion;
                                    }
                                });
                                item.cards = cards;
                            });
                        });
                        return lists;
                    });
            };

            var getCardsForList = function (listId) {
                return $http({
                    url: 'api/list/cards/' + listId,
                    method: "GET"
                })
                    .then(function (result) {
                        var cards = result.data;
                        cards.forEach(function (item) {
                            if (item.due) {
                                item.due = new Date(item.due)
                            }
                        });
                        return cards;
                    });
            };

            return {
                addList: function (title, priority, boardId) {
                    var data = {};
                    data.title = title;
                    data.priority = priority;
                    data.boardId = boardId;
                    return $http.post('api/list/add', JSON.stringify(data))
                        .then(function (result) {
                            //resolve the promise as the data
                            return result;
                        });
                },
                getMembers: function (listId){
                    return $http({
                        url: 'api/list/members/' + listId,
                        method: "GET"
                    }).then(function (result) {
                        //resolve the promise as the data
                        return result.data;
                    });
                },getComments: function (cardId) {
                    return $http({
                        url: 'api/card/comments/'+cardId,
                        method: "GET"
                    }).then(function (result) {
                        //resolve the promise as the data
                        return result.data;
                    });
                },
                editList: function (title, priority, listId) {
                    var data = {};
                    data.title = title;
                    data.priority = priority;
                    return $http.post('api/list/edit/' + listId, JSON.stringify(data))
                        .then(function (result) {
                            //resolve the promise as the data
                            return result;
                        });
                },
                fetchLists: fetchLists,
                getCardsForList: getCardsForList,
                getLists: function () {
                    return lists;
                },
                addCard: function (listId, title) {
                    var data = JSON.stringify({listId: listId, title: title});
                    return $http.post('api/card/add', data)
                        .then(function (result) {
                            return result;
                        });
                },
                moveCard: function (cardId, listId) {
                    var data = JSON.stringify({listId: listId});
                    return $http.post('api/card/move/' + cardId, data)
                        .then(function (result) {
                            return result;
                        });
                },
                moveCardInList: function (boardId, position) {
                    var data = JSON.stringify({position: position});
                    return $http.post('api/card/order/' + boardId, data)
                        .then(function (result) {
                            return result;
                        });
                },
                removeCard: function (cardId) {
                    return $http.post('api/card/remove/' + cardId)
                        .then(function (result) {
                            //resolve the promise as the data
                            return result;
                        });
                },
                editCard: function (cardId, update) {
                    var data = JSON.stringify(update);
                    return $http.post('api/card/edit/' + cardId, data)
                        .then(function (result) {
                            //resolve the promise as the data
                            return result;
                        });
                },commentOnCard:function(cardId,comment){
                    var data = JSON.stringify({comment:comment});
                    return $http.post('api/card/comment/' + cardId, data)
                        .then(function (result) {
                            //resolve the promise as the data
                            return result;
                        });
                },
                removeList: function (listId) {
                    return $http.post('api/list/remove/' + listId)
                        .then(function (result) {
                            //resolve the promise as the data
                            return result;
                        });
                }

            };
        });
})();




