'use strict';

/**
 * Module dependencies
 */
var messagesPolicy = require('../policies/message.server.policy'),
  messages = require('../controllers/message.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/messages').all(messagesPolicy.isAllowed)
    .get(messages.list)
    .post(messages.create);

  // Single article routes
  app.route('/api/message/:messageId').all(messagesPolicy.isAllowed)
    .get(messages.read)
    .put(messages.update)
    .delete(messages.delete);

  // Finish by binding the article middleware
  // app.param('messageId', messages.messageById);
};
