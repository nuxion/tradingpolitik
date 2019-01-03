const Twit = require('twit');
const mongoose = require('mongoose');
const conf = require('./config_dev');
const makeTimeline = require('./models/timeline.js');

mongoose.connect(`mongodb://${conf.mongo}`, { useNewUrlParser: true })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

const TimelineModel = makeTimeline('testing');

/**
 * Async function that obtain the lowest or greatest id from mongodb.
 * @function getId
 * @param {string} user
 * @param {object} mongo.Model
 * @param {number} order -1 desc, 1 asc
 * @returns {object} A promise with tweet object.
 */
getId = async (user, Model, order) => {
  const lowest = await Model.find({ user: user })
    .sort({ id: order })
    .limit(1);

  return lowest;
}

/**
 * Async function that obtain the greatest id from mongodb.
 * @function getId
 * @param {string} user
 * @param {object} mongo.Model
 * @returns {object} A promise with tweet object.
 */
getGreatestId = async (user, Model) => getId(user, Model, -1);

/**
 * Async function that obtain the lowest id from mongodb.
 * @function getLowestId
 * @param {string} user
 * @param {object} mongo.Model
 * @returns {object} A promise with tweet object.
 */
getLowestId = async (user, Model) => getId(user, Model, 1);

/*async function getLowestId(user, Model) {

  const lowest = await Model.find({ user: user })
    .sort({ id: 1 })
    .limit(1);

  return lowest;
}*/

// MAIN 
getLowestId('cosmos_caos', TimelineModel)
  .then((data)=> { console.log(data) })
  .catch((err)=> { console.error(err) } );

getGreatestId('cosmos_caos', TimelineModel)
  .then((data) => { console.log(data) })
  .catch((err) => { console.log(err) });
