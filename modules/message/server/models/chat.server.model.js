'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ChatSchema = new Schema({
  createdOn: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'text cannot be blank'
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  chatId: {
    type: Schema.ObjectId,
    ref: 'chatId'
  }
});

mongoose.model('Chat', ChatSchema);
