const sinon = require('sinon');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const control = require('../lib/controller');
const makeTimelineModel = require('../lib/models/timeline');
const conf = require('../lib/config_dev.js');


describe('Controller', function() {

  before(async () => {
    mongoose.connect(`mongodb://${conf.mongodb.server}/testing`,
      { useNewUrlParser: true })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));
    this.Timeline = makeTimelineModel('test_cosmos')
  })

  after(() => mongoose.connection.close())

  it('Greatest ID', async () => {
    const tweet = await control.getGreatestId('cosmos_caos', this.Timeline);
    expect(tweet[0].id_str).to.equal('1067069307576827904');
  });

  it('Lowest ID', async () => {
    const tweet = await control.getLowestId('cosmos_caos', this.Timeline);
    expect(tweet[0].id_str).to.equal('324161942392545282');
  });
});
