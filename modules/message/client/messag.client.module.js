(function (app) {
  'use strict';

  app.registerModule('message', ['core']);
  app.registerModule('message.services');
  app.registerModule('message.routes', ['ui.router', 'core.routes', 'message.services']);
}(ApplicationConfiguration));
