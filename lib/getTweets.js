/**
 * @function getTweets
 * @param string user screen_name of the user
 * @param number count how much tweet it gets
 * @param Object userTimeline UserTimeline.js object
 * Is a generic function wrapped on Application call
 */
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
module.exports = getTweets;
