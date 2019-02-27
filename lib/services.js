const makeTimelineModel = require('./models/timeline');

class TimelineService {
  constructor(collectionName) {
    this.Model = makeTimelineModel(collectionName);
  }

  topTweets(options) {
    const results = this.Model.find({
      created_at: {
        $gte: options.start,
        $lt: options.end,
      },
      retweeted: false,
    }).limit(options.limit).sort(options.sort);

    return results;
  }
}

module.exports = TimelineService;
