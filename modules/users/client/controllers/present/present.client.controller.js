(function () {
  'use strict';

  angular
    .module('users')
    .controller('PresentController', PresentController);

  PresentController.$inject = ['$scope', 'Authentication'];

  function PresentController($scope, Authentication) {
    var vm = this;

    vm.user = Authentication.user;
  }
}());
