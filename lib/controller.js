const mongoose = require('mongoose');
const conf = require('./config');
const makeTimeline = require('./models/timeline.js');

mongoose.connect(`mongodb://${conf.mongo}`, { useNewUrlParser: true })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));


/**
 * TimelineModel initialized from models/timeline.js
 */
const TimelineModel = makeTimeline('timelinetrading');

/**
 * Async function that obtain the lowest or greatest id from mongodb.
 * @function getId
 * @param {string} user
 * @param {object} mongo.Model
 * @param {number} order -1 desc, 1 asc
 * @returns {object} A promise with tweet object.
 */
const getId = async (user, Model, order) => {
  const lowest = await Model.find({ user: user })
    .sort({ id: order })
    .limit(1);

  return lowest;
};

/**
 * Async function that obtain the greatest id from mongodb.
 * @param {string} user
 * @param {object} mongo.Model
 * @returns {object} A promise with tweet object.
 */
const getGreatestId = async (user, Model) => getId(user, Model, -1);

/**
 * Async function that obtain the lowest id from mongodb.
 * @function getLowestId
 * @param {string} user
 * @param {object} mongo.Model
 * @returns {object} A promise with tweet object.
 */
const getLowestId = async (user, Model) => getId(user, Model, 1);

/**
 * Select most important fields of the tweet, and save in MongoDb.
 * @function preData
 * @param {object}: data
 */
async function preData(data) {

  data.created_at = new Date(data.created_at);
  const timeline = new TimelineModel({
    id: data.id,
    id_str: data.id_str,
    user: data.user.screen_name,
    tags: data.entities.hashtags.toString(),
    created_at: data.created_at,
    text: data.text,
    retweeted: data.retweeted,
    retweet_count: data.retweet_count,
    favorite_count: data.favorite_count,
  });
  try{
    await timeline.save();
    //console.log("Tweet saved", timeline);
    console.log("Tweet saved");
  }catch (err){
    console.log(err.message);
  }
}

/**
 * @function saveDataR
 * @param object data Json of the tweet to save.
 * @param object Model Moongosee model to use.
 * It save a specific Json Object on MongoDb.
 */
async function saveDataR(data, Model) {
  const createdAt = new Date(data.created_at);
  const timeline = new Model({
    id: data.id,
    id_str: data.id_str,
    user: data.user.screen_name,
    tags: data.entities.hashtags.toString(),
    created_at: createdAt,
    text: data.text,
    retweeted: data.retweeted,
    retweet_count: data.retweet_count,
    favorite_count: data.favorite_count,
  });
  try{
    await timeline.save();
    console.log('Tweet saved');
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  getLowestId,
  getGreatestId,
  TimelineModel,
  saveData: preData,
  saveDataR,
  connection: mongoose,
};
