const Twit = require('twit');
const conf = require('./config_dev');
const fs = require('fs');
const mongoTwit = require('./gettingTweets');

const T = new Twit(conf);

async function getUserTimeline(name, count){
  const data = await T.get("/statuses/user_timeline", {screen_name: name, count: count});
  //fs.writeFileSync('../data/user_timeline.json', JSON.stringify(data));
  return data
}

async function getTimelineFull(name, count, max_id, since_id){
  console.log("max_id: "+ max_id);
  console.log("since_id: " +since_id)
  const data = await T.get("/statuses/user_timeline", { 
    screen_name: name, 
    count: count, 
    since_id: since_id, 
    max_id: max_id});

  return data;
}

async function paginate(user, count, Model){
  const lowest = await  mongoTwit.getLowestId(user, Model);
  const greatest = await mongoTwit.getGreatestId(user, Model);
  console.log(greatest.length);

  if (lowest.length > 0 && greatest.length > 0){
    console.log("GetTimelineFull");
    return getTimelineFull(user, count, lowest[0].id, greatest[0].id);
  } else {
    console.log("GetUserTimeline");
    return getUserTimeline(user, count)
  }

  /*return Promise.all([lowest, greatest]).then(
    ( data) => { return getTimelineFull(user,data[0].id, data[1].id ) }
  )
  data = await getTimelineFull(user, count, lowest, greatest);*/

}
// MAIN

const makeTimeline = require('./models/timeline.js');
const TimelineModel = makeTimeline('testing');
const name = 'cosmos_caos';
const count= 15;
//getUserTimeline('cosmos_caos', 200)
paginate(name, count, TimelineModel).then((data)=>{
  fs.writeFileSync('../data/timeline_pagination.json', JSON.stringify(data));
}).catch((err) => console.error(err));

