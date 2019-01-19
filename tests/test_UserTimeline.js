const sinon = require('sinon');
const expect = require('chai').expect;
const fs = require('fs');
const utils = require('util');
const UserTimeline = require('../lib/UserTimeline.js');

const readFileAsync = utils.promisify(fs.readFile);
const twitResponse = JSON.parse(fs.readFileSync('../data/user_timeline.json'));
const twitFile0 = '../data/user_timeline-0.json';
const twitFile1 = '../data/user_timeline-1.json';
const twitFile2 = '../data/user_timeline-2.json';

describe('UserTimeline', function() {

  const T = { get : () => "test" };
  
	before(() => {
   	this.files = [];
		this.files.push(JSON.parse(fs.readFileSync(twitFile0)))
		this.files.push(JSON.parse(fs.readFileSync(twitFile1)))
		this.files.push(JSON.parse(fs.readFileSync(twitFile2)))
		//await Promise.all([files]);
	})

  beforeEach(() => {
    this.TStub = sinon.stub(T, 'get');
    this.ModelStub = sinon.stub();
    this.controller = {
      getLowestId: sinon.stub(),
      getGreatestId: sinon.stub(),
      saveData: sinon.fake(),
    };
    this.TStub.withArgs('/statuses/user_timeline', 
      { screen_name: 'cosmos_caos', count: 20 })
      .resolves(twitResponse)
      .withArgs('/statuses/user_timeline', 
      { screen_name: 'cosmos_caos', count: 200 })
      .resolves(twitResponse);
    this.ut = new UserTimeline(T, this.ModelStub);
    this.ut.control = this.controller;
  })
  afterEach(() => {
    sinon.restore();
  })

  it ('Tweet Library Mocking', (done) => {
    this.ut.T.get('/statuses/user_timeline',
      { screen_name: 'cosmos_caos', count: 20 })
      .then((resp) => {
        expect(resp.resp.statusCode).to.equal(200);
      })
    .then(()=> done(), done);
  });

  it ('getTimeline', async () => {
    const response = await this.ut.getTimeline('cosmos_caos', 20);
    expect(response.resp.statusCode).to.equal(200);
  });

  it('getRangeIds -> getTimeline', async () =>{
    const getTimeline = sinon.spy(this.ut, 'getTimeline');

    this.ut.control.getLowestId = sinon.stub().returns([]);
    this.ut.control.getGreatestId = sinon.stub().returns([]);

    await this.ut.getRangeIds('cosmos_caos', 20, {});
    expect(getTimeline.called).to.be.true;
  })

  it('getRangeIds -> getTimelineRange', async () =>{
    var getTimelineRange = sinon.spy(this.ut, 'getTimelineRange');
    this.ut.control.getLowestId = sinon.stub().returns([{}]);
    this.ut.control.getGreatestId = sinon.stub().returns([{}]);

    await this.ut.getRangeIds('cosmos_caos', 20, {});
    expect(getTimelineRange.called).to.be.true;
  })
  
  it('firstTime', async ()=> {
    this.ut.saveData = sinon.fake.returns(async () => {});
    await this.ut.firstTime('cosmos_caos', 200);

    expect(this.ut.saveData.callCount).to.equal(34);
  })

	it('iterateTweets -> firstTime', async()=>{
		// console.log(`files lenght: ${this.files.length}`);
		// getOldest
		const getOldest = sinon.stub(this.ut, 'getOldest');
		getOldest.onCall(0).resolves(this.files[0]);
		getOldest.onCall(1).resolves(this.files[1]);
		getOldest.resolves(this.files[2]);

    this.ut.saveData = sinon.fake.returns(async () => {});
		await this.ut.iterateTweets('cosmos_caos', '1067069307576827904', 20, 'getOldest');
		expect(this.ut.saveData.callCount).to.equal(34);
	});

  it('iterateTweets -> existing', async()=>{
		console.log(`files lenght: ${this.files.length}`);
		// getNewest
		const getNewest = sinon.stub(this.ut, 'getNewest');
		getNewest.onCall(0).resolves(this.files[0]);
		getNewest.onCall(1).resolves(this.files[1]);
		getNewest.resolves(this.files[2]);
    this.ut.saveData = sinon.fake.returns(async () => {});
		await this.ut.iterateTweets('cosmos_caos', '324173293819138049', 20, 'getNewest');
		expect(this.ut.saveData.callCount).to.equal(34);
	})

})
