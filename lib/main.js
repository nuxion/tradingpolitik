const Twit = require('twit');
const conf = require('./config_dev');
const fs = require('fs');
const mongoTwit = require('./gettingTweets');

const T = new Twit(conf);

/**
 * @function getUserTimeline
 * @param string name screen_name user.
 * @param number count how many tweets.
 * @returns object Json data from twitter api.
 * This method is executed if the user not exists in mongodb.
 */
async function getUserTimeline(name, count){
  const data = await T.get("/statuses/user_timeline", {screen_name: name, count: count});
  //fs.writeFileSync('../data/user_timeline.json', JSON.stringify(data));
  return data
}

/**
 * @function getTimelineRange
 * @param string name screen_name user.
 * @param number count how many tweets.
 * @param number max_id 
 * @param number since_id
 * Get tweets from the Timeline between a range of tweets id.
 */
async function getTimelineRange(name, count, max_id, since_id){
  console.log("max_id: "+ max_id);
  console.log("since_id: " +since_id)
  const data = await T.get("/statuses/user_timeline", { 
    screen_name: name, 
    count: count, 
    since_id: since_id, 
    max_id: max_id});

  return data;
}

/**
 * @function getRangeIds
 * @param string user screen_name
 * @param number count 
 * @param Object Model TimelineModel
 * @returns Object Json tweets.
 *
 * Find the lowest and greatest ID of tweets on MongoDB.
 */
async function getRangeIds(user, count, Model){
  const lowest = await  mongoTwit.getLowestId(user, Model);
  const greatest = await mongoTwit.getGreatestId(user, Model);
  console.log(greatest.length);

  if (lowest.length > 0 && greatest.length > 0){
    console.log("GetTimelineFull");
    return getTimelineRange(user, count, lowest[0].id, greatest[0].id);
  } else {
    console.log("GetUserTimeline");
    return getUserTimeline(user, count)
  }

  /*return Promise.all([lowest, greatest]).then(
    ( data) => { return getTimelineRange(user,data[0].id, data[1].id ) }
  )
  data = await getTimelineRange(user, count, lowest, greatest);*/

}

/**
 * @function cursoring
 * @param string user screen_name
 * @param number count number of tweets.
 * @param Object Model TimelineModel.
 * Method that iterate user timeline, and write to filesystem the result.
 */
async function cursoring(user, count, Model) {
  var result = 1;
  var i = 0;
  while(result != 0){
    data = await getRangeIds(user, count, Model);
    result = data.data.length;
    i++;
    console.log('Round: '+i);
    fs.writeFileSync(`../data/timeline_pagination${i}.json`, JSON.stringify(data));
  }
}
// MAIN

const makeTimeline = require('./models/timeline.js');
const TimelineModel = makeTimeline('testing');
const name = 'cosmos_caos';
const count= 15;
//getUserTimeline('cosmos_caos', 200)
//

/*getRangeIds(name, count, TimelineModel).then((data)=>{
  fs.writeFileSync('../data/timeline_pagination.json', JSON.stringify(data));
}).catch((err) => console.error(err));*/
cursoring(name, count, TimelineModel).then((data)=> console.log("Finish..."))

