'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var MessageSchema = new Schema({
  createdOn: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    default: '',
    trim: true,
    required: 'text cannot be blank'
  },
  createdBy: {
    type: Schema.ObjectId,
    trim: true,
    required: 'createdBy cannot be blank'
  },
  sendTo: {
    type: Schema.ObjectId,
    trim: true,
    required: 'sendTo cannot be blank'
  },
  chatId: {
    type: Schema.ObjectId,
    ref: 'chatId'
  },
  isRead: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Message', MessageSchema);
