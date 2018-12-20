const Twit = require('twit');
const conf = require('./config');
const fs = require('fs');

const T = new Twit(conf);

async function getUserTimeline(name, count){
  data = await T.get("/statuses/user_timeline", {screen_name: name, count: count});
  fs.writeFileSync('../data/user_timeline.json', JSON.stringify(data));
}

const name = 'cosmos_caos';
const count= 200;
getUserTimeline('cosmos_caos', 200)

