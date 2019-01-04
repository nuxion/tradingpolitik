/**
 * @class UserTimeline
 * Works with the user timeline on Twitter.
 * His need the Object Twit initialized, and the controller.js
 */
class UserTimeline {
  constructor(T, controller) {
    this.T = T;
    this.control = controller;
  }

  /**
   * @function getUserTimeline
   * @param string name screen_name user.
   * @param number count how many tweets.
   * @returns object Json data from twitter api.
   * This method is executed if the user not exists in mongodb.
   */
  async getTimeline(name, count) {
    const data = await this.T.get('/statuses/user_timeline',
      { screen_name: name, count: count });
    return data;
  }

  /**
   * @function getTimelineRange
   * @param string name screen_name user.
   * @param number count how many tweets.
   * @param number max_id
   * @param number since_id
   * Get tweets from the Timeline between a range of tweets id.
   */
  async getTimelineRange(name, count, max_id, since_id) {
    console.log('max_id: '+ max_id);
    console.log('since_id: ' +since_id);
    const data = await this.T.get('/statuses/user_timeline', { 
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
  async getRangeIds(user, count) {
    const lowest = await this.control.getLowestId(user, this.control.TimelineModel);
    const greatest = await this.control.getGreatestId(user, this.control.TimelineModel);
    console.log(greatest.length);

    if (lowest.length > 0 && greatest.length > 0) {
      return this.getTimelineRange(user, count, lowest[0].id, greatest[0].id);
    } else {
      return this.getTimeline(user, count);
    }
  }
}

module.exports = UserTimeline;
