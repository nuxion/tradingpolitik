const mongoose = require('mongoose');
const fs = require('fs');
const conf = require('./config_dev');
const TweetModel = require('./models/tweet.js');


mongoose.connect(`mongodb://${conf.mongo}`, { useNewUrlParser: true });

const tweets = JSON.parse(fs.readFileSync('../data/user_timeline.json'));

//tweets.data.forEach(e => console.log(e));
e = tweets.data[0];
//eid = mongoose.Types.ObjectId(e.id_str);

tweet = new TweetModel({
  id: e.id,
  create_at: e.create_at,
  text: e.text,
  retweeted: e.retweeted,
  retweet_count: e.retweet_count,
  favorite_count: e.favorite_count,
});
tweet.save();
