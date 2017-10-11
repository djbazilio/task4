'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Message = mongoose.model('Message'),
  Chat = mongoose.model('Chat'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an message
 */
exports.create = function (req, res) {
  var message = new Message(req.body);
  message.createdBy = req.user._id.toString();
  message.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(message);
    }
  });
};

/**
 * Show the current message
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var messages = req.messages ? req.messages.toJSON() : {};

  // Add a custom field to the messages, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the message model.
  messages.isCurrentUserOwner = !!(req.user && messages.user && messages.user._id.toString() === req.user._id.toString());

  res.json(messages);
};

/**
 * Update an message
 */
exports.update = function (req, res) {
  var messages = req.messages;

  messages.text = req.body.text;
  messages.chatId = req.body.chatId;
  messages.createdBy = req.user._id;

  Message.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(messages);
    }
  });
};

/**
 * Delete an message
 */
exports.delete = function (req, res) {
  var messages = req.messages;

  messages.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(messages);
    }
  });
};

/**
 * List of messages
 */

exports.list = function (req, res) {
  Chat.aggregate([
    {
      $lookup: {
        from: 'messages',
        localField: '_id',
        foreignField: 'chatId',
        as: 'messages'
      }
    }, {
      $unwind: {
        path: '$messages',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match: {
        $or: [
          { 'messages.sendTo': req.user._id },
          { 'messages.createdBy': req.user._id }
        ]
      } },
    {
      $lookup: {
        from: 'users',
        localField: 'messages.createdBy',
        foreignField: '_id',
        as: 'user'
      }
    }, {
      $group: {
        _id: {
          chtaId: '$_id',
          title: '$title',
          createdBy: '$createdBy',
          createdOn: '$createdOn'
        },
        message: { $last: '$messages' },
        user: {
          $last: '$user'
        }
      }
    },
    { $unwind: '$user' },
    {
      $group: {
        _id: {
          chat: '$_id',
          message: '$message',
          user: '$user'
        }
      }
    },
    {
      $project: {
        _id: {
          chat: 1,
          message: {
            _id: 1,
            createdBy: 1,
            sendTo: 1,
            isRead: 1,
            text: 1,
            createdOn: 1
          },
          user: {
            _id: 1,
            displayName: 1,
            roles: 1,
            profileImageURL: 1,
            username: 1
          }
        }
      }
    }
  ])
    .sort('-createdOn').exec(function (err, messages) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(messages);
      }
    });
};

/**
 * message middleware
 */
exports.messageByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      messages: 'message is invalid'
    });
  }

  Message.findById(id).populate('user', 'displayName').exec(function (err, messages) {
    if (err) {
      return next(err);
    } else if (!messages) {
      return res.status(404).send({
        message: 'No message with that identifier has been found'
      });
    }
    req.messages = messages;
    next();
  });
};
