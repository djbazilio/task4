'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an message
 */



exports.read = function (req, res) {
    // convert mongoose document to JSON
    var messages = req.messages ? req.messages.toJSON() : {};

    // Add a custom field to the messages, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the message model.
    messages.isCurrentUserOwner = !!(req.user && messages.user && messages.user._id.toString() === req.user._id.toString());

    res.json(messages);
};
