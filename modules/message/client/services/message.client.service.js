(function () {
  'use strict';

  angular
    .module('message.services')
    .factory('MessageService', MessageService);

  MessageService.$inject = ['$resource', '$log'];

  function MessageService($resource, $log) {
    var Message = $resource('/api/messages', {}, {
      update: {
        method: 'PUT'
      },
      chatList: {
        method: 'GET'
      }
    });

    angular.extend(Message, {
      createOrUpdate: function () {
        var article = this;
        return createOrUpdate(article);
      },
      getChats: function () {
        return this.chatList().$promise;
      }
    });

    return Message;

    function createOrUpdate(message) {
      if (message._id) {
        return message.$update(onSuccess, onError);
      } else {
        return message.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(article) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
