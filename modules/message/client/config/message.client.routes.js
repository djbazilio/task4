(function () {
  'use strict';

  angular
      .module('message.routes')
      .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
        .state('user.messages', {
          abstract: true,
          url: '/messages',
          template: '<ui-view/>'
        })
        .state('user.messages.list', {
          url: '',
          templateUrl: '/modules/message/client/views/list-messages.client.view.html',
          controller: 'MessageListController',
          controllerAs: 'vm',
          data: {
            pageTitle: 'Messages List'
          }
        })
        .state('messages.view', {
          url: '/:chatId',
          templateUrl: '/modules/message/client/views/view-messages.client.view.html',
          controller: 'MessageController',
          controllerAs: 'vm',
          resolve: {
            articleResolve: getChatList
          },
          data: {
            pageTitle: 'Article {{ articleResolve.title }}'
          }
        });
  }

  getChatList.$inject = ['$stateParams', 'MessageService'];

  function getChatList($stateParams, MessageService) {
    return MessageService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }
}());
