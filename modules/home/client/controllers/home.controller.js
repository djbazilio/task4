(function () {
  'use strict';

  angular
    .module('home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope','HomeService'];

  function HomeController($scope, HomeService) {
    var vm = this;
    HomeService.get().then(function(e){
      vm.home = e;
    })
  }
}());
