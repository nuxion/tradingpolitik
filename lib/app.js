const UserTimeline = require('./UserTimeline');
const makeTimelineModel = require('./models/timeline');
const getTweets = require('./getTweets');

/**
 * @class App
 * Its a wrapper for the module itself. This is the entrypoint.
 */
class App {
  constructor() {
    this.Model = {};
    this.userTimeline = {};
  }

  /**
   * @function setTimeline
   * @param Object T twitter object
   * @param string name collection name on mongodb.
   * This function sets T object to get tweets from Twitter API,
   * and prepare the model to save data to mongodb.
   */
  setTimeline(T, name) {
    this.Model = makeTimelineModel(name);
    this.userTimeline = new UserTimeline(T, this.Model);
  }

  /**
   * @function run
   * @param string user screen_name of the user to get tweets
   * @param number count how much tweets to get
   * This is the main function to get and save tweets.
   */
  async run(user, count) {
    await getTweets(user, count, this.userTimeline);
  }
}

module.exports = App;
