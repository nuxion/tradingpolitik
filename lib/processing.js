const fs = require('fs');
const _ = require('lodash');

const tweets = JSON.parse(fs.readFileSync('../data/user_timeline.json'));
const ids = new Array();

tweets.data.forEach(function(e){
  ids.push(e.id);
});
ordered = _.sortBy(ids);
console.log(ordered);
