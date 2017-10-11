'use strict';

/**
 * Module dependencies
 */
var homePolicy = require('../policies/home.server.policy'),
    home = require('../controllers/home.server.controller');

module.exports = function (app) {
    // Articles collection routes
    app.route('/api/home').all(homePolicy.isAllowed)
        .get(home.read);
};