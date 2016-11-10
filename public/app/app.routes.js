(function () {
    'use strict';
    angular.module('app')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/board');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/components/login/login.html',
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: '/signup',
                controller: 'SignupCtrl',
                templateUrl: 'app/components/signup/signup.html'
            })
            .state('boards', {
                url: '/board',
                templateUrl: 'app/components/board/board.html',
                controller: 'BoardController',
                data: {
                    requiresLogin: true
                }
            })
            .state('lists', {
                url: '/board/:boardId',
                templateUrl: 'app/components/list/list.html',
                controller: 'ListController',
                data: {
                    requiresLogin: true
                }
            });
    }
})();

