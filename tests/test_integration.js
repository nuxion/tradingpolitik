const sinon = require('sinon');
const expect = require('chai').expect;
const main = require('../lib/main.js');
const control = require('../lib/controller');
const conf = require('../lib/config_dev');
const UserTimeline = require('../lib/UserTimeline');
const Twit = require('twit');

describe('Integration main()', function(){
  
  before(()=>{
    this.T = new Twit(conf.twitter);
    this.name = 'cosmos_caos';
    this.count= 15;
    this.ut = new UserTimeline(this.T, control);
  })

  it('Save user timeline',async () => {

    await main(this.name, this.count, this.ut);
    const result = await control.TimelineModel.count();
    expect(34).to.equal(result);
  })
})
