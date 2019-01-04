const sinon = require('sinon');
const expect = require('chai').expect;
const fs = require('fs');
const UserTimeline = require('../lib/UserTimeline');
const twitResponse = JSON.parse(fs.readFileSync('../data/user_timeline.json'));

describe('UserTimeline', function(){
  
  const T = {};
  const controller = { getLowestId: sinon.stub(),
    getGreatestId: sinon.stub()
  };
  const ut = new UserTimeline(T, controller);

  beforeEach(() => {
    var tObject = sinon.stub();
    tObject.withArgs('/statuses/user_timeline', 
      { screen_name: 'cosmos_caos', count: 20 })
      .returns(twitResponse);
    T.get = tObject;
  })
  afterEach(()=>{
    sinon.restore();
  })

  it ('Tweet Library Mocking', (done) => {
    response = T.get('/statuses/user_timeline', { screen_name: 'cosmos_caos', count: 20 });
    expect(response.resp.statusCode).to.equal(200);
    done();
  })
  it ('getTimeline', async () => {
    response = await ut.getTimeline('cosmos_caos', 20);
    expect(response.resp.statusCode).to.equal(200);
  })
  it('getRangeIds -> getTimeline', async () =>{
    var getTimeline = sinon.spy(ut, 'getTimeline');
    //var fake = sinon.fake.returns(true);
    //ut.getTimeline = fake;

    ut.control.getLowestId = sinon.stub().returns([]);
    ut.control.getGreatestId = sinon.stub().returns([]);

    await ut.getRangeIds('cosmos_caos', 20, {});
    //expect(result).to.equal(true);
    expect(getTimeline.called).to.be.true;
  })
  it('getRangeIds -> getTimelineRange', async () =>{
    var getTimelineRange = sinon.spy(ut, 'getTimelineRange');
    ut.control.getLowestId = sinon.stub().returns([{}]);
    ut.control.getGreatestId = sinon.stub().returns([{}]);

    await ut.getRangeIds('cosmos_caos', 20, {});
    expect(getTimelineRange.called).to.be.true;
  })

  
})
