(function () {
    'use strict';
    angular.module('app.kanban.signup', ['angular-storage'])
        .controller('SignupCtrl', function SignupController($scope, $http, store, $state) {

            $scope.user = {};

            $scope.signUp = function () {
                $http({
                    url: '/auth/signup',
                    method: 'POST',
                    data: $scope.user
                }).then(function (response) {
                    store.set('jwt', response.data.id_token);
                    $state.go('boards');
                }, function (error) {
                    //TODO error
                });
            }

        });
})();