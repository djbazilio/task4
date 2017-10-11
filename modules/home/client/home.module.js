(function (app) {
  'use strict';

  app.registerModule('home', ['core']);
  app.registerModule('home.service');
  app.registerModule('home.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
