(function () {
    'use strict';
    angular.module('app',
        ['angular-jwt', 'as.sortable','angular-storage', 'ngRoute', 'ngAnimate', 'ngMaterial',
        'ui.router', 'app.kanban.board', 'app.kanban.list', 'app.kanban.login','app.kanban.logout', 'app.kanban.signup'])

        .config(['$mdThemingProvider', 'jwtInterceptorProvider', '$httpProvider',
            function ($mdThemingProvider, jwtInterceptorProvider, $httpProvider) {


                jwtInterceptorProvider.tokenGetter = function (store) {
                    return store.get('jwt');
                };
                $httpProvider.interceptors.push('jwtInterceptor');


                $mdThemingProvider.theme('default')
                    .primaryPalette('blue-grey')
                    .accentPalette('deep-orange');
            }])
        .run(function ($state, $rootScope, store, jwtHelper) {
            $rootScope.$on('$stateChangeStart', function (e, to) {
                if (to.data && to.data.requiresLogin) {
                    if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                        e.preventDefault();
                        $state.go('login');
                    }
                }
            })
        })

})();