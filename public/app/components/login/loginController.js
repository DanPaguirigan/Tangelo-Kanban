(function () {
    'use strict';

    angular.module('app.kanban.login', ['angular-storage'])
        .controller('LoginCtrl', function LoginController($rootScope,$scope, $http, store, $state,$mdDialog) {

            $scope.user = {};

            $scope.login = function () {
                $http({
                    url: '/auth',
                    method: 'POST',
                    data: $scope.user
                }).then(function (response) {
                    store.set('jwt', response.data.token);
                    store.set('username', $scope.user.username);
                    $state.go('boards');
                }, function (error) {
                    showAlert(error.data);
                });
            };

            var showAlert = function(ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                // Modal dialogs should fully cover application
                // to prevent interaction outside of dialog
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Failed to log in')
                        .textContent('Invalid username or password.')
                        .ariaLabel('Login alert Dialog')
                        .ok('Close')
                        .targetEvent(ev)
                );
            };

        })

})();