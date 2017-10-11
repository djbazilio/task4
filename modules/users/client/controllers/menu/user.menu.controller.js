(function () {
  'use strict';

  angular
    .module('users')
    .controller('UserMenuController', UserMenuController);

  UserMenuController.$inject = ['$scope', 'menuService'];

  function UserMenuController($scope, menuService) {
    var vm = this;
    vm.accountMenu = menuService.getMenu('account').items[0];
  }
}());
