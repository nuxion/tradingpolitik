const sinon = require('sinon');
const expect = require('chai').expect;
const fs = require('fs');
const utils = require('util');
const proxyquire = require('proxyquire');

const readFileAsync = utils.promisify(fs.readFile);
const twitResponse = JSON.parse(fs.readFileSync('../data/user_timeline.json'));
const twitFile0 = '../data/user_timeline-0.json';
const twitFile1 = '../data/user_timeline-1.json';
const twitFile2 = '../data/user_timeline-2.json';

describe('UserTimeline', function() {
  
  const T = { get : () => "test" };
  const controller = {
    getLowestId: sinon.stub(),
    getGreatestId: sinon.stub(),
    saveData: sinon.fake(),
  };
  var saveDataStub;
  var getLowestIdStub;
  var getGreatestIdStub;
  var UserTimeline;
  var ut;


	before(() => {
   	this.files = [];
		this.files.push(JSON.parse(fs.readFileSync(twitFile0)))
		this.files.push(JSON.parse(fs.readFileSync(twitFile1)))
		this.files.push(JSON.parse(fs.readFileSync(twitFile2)))
		//await Promise.all([files]);
	})

  beforeEach(() => {
    saveDataStub = sinon.fake();
    getLowestIdStub = sinon.stub();
    getGreatestIdStub = sinon.stub();
    UserTimeline = proxyquire('../lib/UserTimeline',
      {
        './controller':
        /*{
          saveDataR: saveDataStub,
          getLowestId: getLowestIdStub,
          getGreatestId: getGreatestIdStub
        }*/
        controller
      });

    var tObject = sinon.stub(T, 'get');
    tObject.withArgs('/statuses/user_timeline', 
      { screen_name: 'cosmos_caos', count: 20 })
      .resolves(twitResponse)
      .withArgs('/statuses/user_timeline', 
      { screen_name: 'cosmos_caos', count: 200 })
      .resolves(twitResponse);

    ut = new UserTimeline(T, controller);
  })

  afterEach(() => {
    sinon.restore();
  })

  it ('Tweet Library Mocking', (done) => {
    T.get('/statuses/user_timeline',
      { screen_name: 'cosmos_caos', count: 20 })
      .then((resp) => {
        expect(resp.resp.statusCode).to.equal(200);
      })
    .then(()=> done(), done);
  })

  it ('getTimeline', async () => {
    const response = await ut.getTimeline('cosmos_caos', 20);
    expect(response.resp.statusCode).to.equal(200);
  })

  it('getRangeIds -> getTimeline', async () =>{
    const getTimeline = sinon.spy(ut, 'getTimeline');

    getLowestIdStub = sinon.stub().returns([]);
    getGreatestIdStub = sinon.stub().returns([]);
    UserTimeline['./controller'].getLowestId = getLowestIdStub;
    UserTimeline['./controller'].getGreatestId = getGreatestIdStub;

    await ut.getRangeIds('cosmos_caos', 20, {});
    expect(getTimeline.called).to.be.true;
  })

  it('getRangeIds -> getTimelineRange', async () =>{
    var getTimelineRange = sinon.spy(ut, 'getTimelineRange');
    getLowestIdStub = sinon.stub().returns([{}]);
    getGreatestIdStub = sinon.stub().returns([{}]);

    await ut.getRangeIds('cosmos_caos', 20, {});
    expect(getTimelineRange.called).to.be.true;
  })
  
  it('firstTime', async ()=> {
    saveDataStub = sinon.fake.returns(async () => {});
    await ut.firstTime('cosmos_caos', 200);
    
    expect(saveDataStub.callCount).to.equal(34);
  })

	it('iterateTweets -> firstTime', async()=>{
		// console.log(`files lenght: ${this.files.length}`);
		// getOldest
		const getOldest = sinon.stub(ut, 'getOldest');
		getOldest.onCall(0).resolves(this.files[0]);
		getOldest.onCall(1).resolves(this.files[1]);
		getOldest.resolves(this.files[2]);

    ut.saveData = sinon.fake.returns(async () => {});
		await ut.iterateTweets('cosmos_caos', '1067069307576827904', 20, 'getOldest');
		expect(ut.saveData.callCount).to.equal(34);
	})
  it('iterateTweets -> existing', async()=>{
		console.log(`files lenght: ${this.files.length}`);
		// getNewest
		const getNewest = sinon.stub(ut, 'getNewest');
		getNewest.onCall(0).resolves(this.files[0]);
		getNewest.onCall(1).resolves(this.files[1]);
		getNewest.resolves(this.files[2]);
    ut.saveData = sinon.fake.returns(async () => {});
		await ut.iterateTweets('cosmos_caos', '324173293819138049', 20, 'getNewest');
		expect(ut.saveData.callCount).to.equal(34);
	})

})
