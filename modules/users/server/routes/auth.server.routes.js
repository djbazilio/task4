'use strict';

/**
 * Module dependencies
 */
var passport = require('passport');

module.exports = function (app) {
  // User Routes
  var users = require('../controllers/users.server.controller');

  // Setting up the users password api
  app.route('/api/forgot').post(users.forgot);
  app.route('/api/reset/:token').get(users.validateResetToken);
  app.route('/api/reset/:token').post(users.reset);

  // Setting up the users authentication api
  app.route('/api/signup').post(users.signup);
  app.route('/api/signin').post(users.signin);
  app.route('/api/signout').get(users.signout);

  // Setting the facebook oauth routes
  app.route('/api/facebook').get(users.oauthCall('facebook', {
    scope: ['email']
  }));
  app.route('/api/facebook/callback').get(users.oauthCallback('facebook'));

  // Setting the twitter oauth routes
  app.route('/api/twitter').get(users.oauthCall('twitter'));
  app.route('/api/twitter/callback').get(users.oauthCallback('twitter'));

  // Setting the google oauth routes
  app.route('/api/google').get(users.oauthCall('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));
  app.route('/api/google/callback').get(users.oauthCallback('google'));

  // Setting the linkedin oauth routes
  app.route('/api/linkedin').get(users.oauthCall('linkedin', {
    scope: [
      'r_basicprofile',
      'r_emailaddress'
    ]
  }));
  app.route('/api/linkedin/callback').get(users.oauthCallback('linkedin'));

  // Setting the github oauth routes
  app.route('/api/github').get(users.oauthCall('github'));
  app.route('/api/github/callback').get(users.oauthCallback('github'));

  // Setting the paypal oauth routes
  app.route('/api/paypal').get(users.oauthCall('paypal'));
  app.route('/api/paypal/callback').get(users.oauthCallback('paypal'));
};
