(function () {
    'use strict';
    angular.module('app.kanban.logout', ['angular-storage'])
        .controller('LogoutCtrl', function LogoutController($scope, store, $state) {

            $scope.logout = function () {
                store.remove('jwt');
                store.remove('username');
                $state.go('login');
            };

            $scope.username = function () {
                return store.get("username");
            };

        });
})();