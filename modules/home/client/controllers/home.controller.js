(function () {
  'use strict';

  angular
    .module('home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'ArticlesService'];

  function HomeController($scope, ArticlesService) {
    var vm = this;

    vm.articles = ArticlesService.query();
  }
}());
