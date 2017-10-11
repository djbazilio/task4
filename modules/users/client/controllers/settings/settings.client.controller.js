(function () {
  'use strict';

  angular
    .module('users')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$scope', 'Authentication', '$location', '$stateParams'];

  function SettingsController($scope, Authentication, $location, $stateParams) {
    var vm = this;
    if (vm.user&&vm.user.username !== $stateParams.user) {
      $location.path('/' + $stateParams.user);
    }
    vm.user = Authentication.user;
  }
}());
