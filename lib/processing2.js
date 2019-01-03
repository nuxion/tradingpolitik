const mongoose = require('mongoose');
const fs = require('fs');
const conf = require('./config_dev');
const makeTimeline = require('./models/timeline.js');

mongoose.connect(`mongodb://${conf.mongo}`, { useNewUrlParser: true })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

const TimelineModel = makeTimeline('testing');

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
    console.log("Tweet saved", timeline);
  }catch (err){
    console.log(err.message);
  }
}

// MAIN
const tweets = JSON.parse(fs.readFileSync('../data/user_timeline.json'));
const e = tweets.data[0];

tweets.data.map(preData)
