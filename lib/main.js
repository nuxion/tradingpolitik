const Twit = require('twit');
const UserTimeline = require('./UserTimeline');
const control = require('./controller');
const conf = require('./config_dev');

/**
 * @function cursoring
 * @param string user screen_name
 * @param number count number of tweets.
 * @param Object Model TimelineModel.
 * Method that iterate user timeline, and write to filesystem the result.
 */
/*
async function cursoring(user, count, userTimeline) {
  let result = 1;
  let i = 0;
  let lastId = await userTimeline.getLowestId(user);
  if ( lastId.length == 0){
    while(result !== 0){
      let data = await userTimeline.getOld(user, lastId[0].id_str, count)
      result = data.data.length;
      i++;
      await data.data.map(control.saveData);
      console.log(`Round ${i}, Tweets: ${result}, Status: ${data.resp.statusCode}`);
      fs.writeFileSync(`../data/b-timeline_pagination${i}.json`, JSON.stringify(data));
    }
  } else { 
    let newestId = await userTimeline.getGreatestId(user);
    while( result !==0 ) {
      let data = await userTimeline.getNewest(user, newestId, count);
      result = data.data.length;
      await data.

    }
  }
}*/

async function getTweets(user, count, userTimeline) {
  const newestTweet = await userTimeline.getGreatestId(user, count);
  console.log(newestTweet);
  if (newestTweet.length !== 0) {
		// if the user exist on mongoDB
    console.log(`user: ${user} id: ${newestTweet[0].id_str}`);
    await userTimeline.iterateTweets(user, newestTweet[0].id_str, count, 'getNewest');
  } else {
      const lastTweet = await userTimeline.firstTime(user, count);
      await userTimeline.iterateTweets(user, lastTweet.id_str, count, 'getOldest');
    }
}
// MAIN
module.exports = { getTweets };

const T = new Twit(conf.twitter);
const name = 'cosmos_caos';
const count= 15;
const ut = new UserTimeline(T, control);
//getUserTimeline('cosmos_caos', 200)

/*getRangeIds(name, count, TimelineModel).then((data)=>{
  fs.writeFileSync('../data/timeline_pagination.json', JSON.stringify(data));
}).catch((err) => console.error(err));*/
//cursoring(name, count, ut).then((data)=> console.log("Finish..."))
getTweets(name, count, ut).then(()=> {
  console.log("Finish..."); 
  //ut.disconnect();
})

