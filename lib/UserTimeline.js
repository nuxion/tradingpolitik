/**
 * @class UserTimeline
 * Works with the user timeline on Twitter.
 * His need the Object Twit initialized, and the controller.js
 */
class UserTimeline {
  constructor(T, controller) {
    this.T = T;
    this.control = controller;
    this.getter = this.getTimeline;
  }

  /**
   * @function getUserTimeline
   * @param string name screen_name user.
   * @param number count how many tweets.
   * @returns object Json data from twitter api.
   * This method is executed if the user not exists in mongodb.
   */
  async getTimeline(name, count) {
    let data = await this.T.get('/statuses/user_timeline',
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
    let data = await this.T.get('/statuses/user_timeline', { 
      screen_name: name, 
      count: count, 
      //since_id: since_id, 
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
    let lowest = await this.control.getLowestId(user, this.control.TimelineModel);
    let greatest = await this.control.getGreatestId(user, this.control.TimelineModel);
    console.log(greatest.length);

    if (lowest.length > 0 && greatest.length > 0) {
      return this.getTimelineRange(user, count, lowest[0].id_str, greatest[0].id_str);
    } else {
      return this.getTimeline(user, count);
    }
  }

  /**
   * @function getLowestId
   * @param string user screen_name
   * wrapper of this.control.getLowestId.
   */
  async getLowestId(user){
    let lowest = await this.control.getLowestId(user, this.control.TimelineModel);
    return lowest;
  }
  
  /**
   * @function getLowestId
   * @param string user screen_name
   * wrapper of this.control.getGreatestId.
   */
  async getGreatestId(user){
    let greatest = await this.control.getGreatestId(user, this.control.TimelineModel);
    return greatest;
  }


  /**
   * @function getOld
   * @param string user
   * @param string lastId
   * @param number count
   * @returns Object json tweet response.
   * It Gets from Twitter API, older tweets than lastId passed.
   */
  async getOldest(user, lastId, count){
    let data = await this.T.get('/statuses/user_timeline', { 
      screen_name: user, 
      count: count, 
      //since_id: since_id, 
      max_id: lastId});
    return data;
  }

  /**
   * @function getNewest
   * @param string user
   * @param string lastId
   * @param number count
   * @returns Object json tweet response.
   * It Gets from Twitter API, newest tweets than newestId passed.
   */
  async getNewest(user, newestId, count){
    let data = await this.T.get('/statuses/user_timeline', { 
    screen_name: user, 
    count: count, 
    since_id: newestId, 
    })
    return data;
  }

  /**
   * @function iterateTweets
   * @param string user screen_name from api
   * @param string id id_str
   * @param number count 
   * @param string action -> name of the method
   * Strategy pattern to select wich method call. 
   */
  async iterateTweets(user, id, count, action) {
    let result = 1;
    let i = 0;
    while( result !== 0 ){
      let data = await this[action](user, id, count);
      i++;
      try{ 
        result = data.data.length;
        let compareId = data.data[result -1].id_str;
        if (compareId == id){ result = 0 }
        await data.data.map(this.control.saveData);
        console.log(`Round ${i}, Tweets: ${result}, Status: ${data.resp.statusCode}`);
        fs.writeFileSync(`../data/b-timeline_pagination${i}.json`, 
          JSON.stringify(data));
      }catch(error){
        console.warn(error);
        result = 0;
      }
      
    }
  }

  async firstTime(user, count){
    let data = await this.getTimeline(user, count)
    await data.data.map(this.control.saveData);
  }

  disconnect(){
    this.control.connection.disconnect();
  }
  strategy(name){
    this[name]();
  }
  test(){
    console.log("HEllo");
  }
}

module.exports = UserTimeline;