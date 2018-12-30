/**
 * Timeline Model
 * @class timeline
 * @license MPL 2.0
 * @author Xavier Petit
 */

const mongoose = require('mongoose');

/**
 * Model to save tweets from timelines.
 */
const tweetSchema = new mongoose.Schema({
  // id: mongoose.Schema.ObjectId,
  id: Number,
  id_str: String,
  create_at: Date,
  text: String,
  tags: String,
  retweeted: Boolean,
  retweet_count: Number,
  favorite_count: Number,
});


/**
 * Exported function.
 * Receives a string with a collection name and return a model.
 * @function makeTimelineModel
 * @param {string} collectionName
 * @returns {object} mongoose.model
 */
module.exports = function makeTimelineModel(collectionName) {
  return mongoose.model('Timeline', tweetSchema, collectionName);
};
