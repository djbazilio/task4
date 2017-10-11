(function () {
  'use strict';

  angular
      .module('articles')
      .controller('MessageController', MessageController);

  MessageController.$inject = ['$scope', 'articleResolve', 'Authentication'];

  function MessageController($scope, article, Authentication) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;

  }
}());
