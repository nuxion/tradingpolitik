const Twit = require('twit');
const UserTimeline = require('./UserTimeline');
const control = require('./controller');
const fs = require('fs');
const conf = require('./config_dev');

/**
 * @function cursoring
 * @param string user screen_name
 * @param number count number of tweets.
 * @param Object Model TimelineModel.
 * Method that iterate user timeline, and write to filesystem the result.
 */
async function cursoring(user, count, userTimeline) {
  let result = 1;
  let i = 0;
  while(result != 0) {
    let data = await userTimeline.getRangeIds(user, count);
    result = data.data.length;
    i++;
    console.log('Round: '+i);
    data.data.map(control.saveData);
    fs.writeFileSync(`../data/timeline_pagination${i}.json`, JSON.stringify(data));
  }
}
// MAIN

const T = new Twit(conf);
const name = 'cosmos_caos';
const count= 15;
const ut = new UserTimeline(T, control);
//getUserTimeline('cosmos_caos', 200)
//

/*getRangeIds(name, count, TimelineModel).then((data)=>{
  fs.writeFileSync('../data/timeline_pagination.json', JSON.stringify(data));
}).catch((err) => console.error(err));*/
cursoring(name, count, ut).then((data)=> console.log("Finish..."))

