(function () {
  'use strict';

  angular
    .module('message')
    .controller('MessageListController', MessageListController);

  MessageListController.$inject = ['MessageService'];

  function MessageListController(MessageService) {
    var vm = this;

    vm.chatList = MessageService.query();
  }
}());
