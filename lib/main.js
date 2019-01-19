const Twit = require('twit');
const UserTimeline = require('./UserTimeline');
const control = require('./controller');
const conf = require('./config_dev');

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

