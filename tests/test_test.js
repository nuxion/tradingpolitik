const proxyquire = require('proxyquire').noPreserveCache();
const sinon = require('sinon');
const expect = require('chai').expect;
const fs = require('fs');
const utils = require('util');
//const UserTimeline = require('../lib/UserTimeline');
const control = require('../lib/controller');

const readFileAsync = utils.promisify(fs.readFile);
const twitResponse = JSON.parse(fs.readFileSync('../data/user_timeline.json'));
const twitFile0 = '../data/user_timeline-0.json';
const twitFile1 = '../data/user_timeline-1.json';
const twitFile2 = '../data/user_timeline-2.json';

describe('UserTimeline', function () {
  const controller = {
    getLowestId: sinon.stub(),
    getGreatestId: sinon.stub(),
    saveData: sinon.fake.returns('saved'),
    saveDataR: sinon.fake.returns('savedR'),
  };
  var UserTimeline;
  var UserTimeline2;
  var saveDataStub;
  var ut;
  var Twit;

	before(() => {

	});

  beforeEach(() => {
    saveDataStub = sinon.fake.returns('savedR');
    UserTimeline = proxyquire('../lib/UserTimeline',
      { './controller': { saveDataR: saveDataStub }, '@global': true });

    ut = new UserTimeline({}, controller);
  });

  afterEach(() => {
    sinon.restore();
  });

  it ('control dependency called', () => {
    ut.saveData('test');
    expect(saveDataStub.called).to.be.true;
  });

  it ('value returned', () => {
    const response = ut.saveData('test');
    expect(response).to.equal('savedR');
  });

  it ('stub changed', () => {
    saveDataStub = sinon.fake.returns('savedchanged');
    UserTimeline2 = proxyquire('../lib/UserTimeline',
      { './controller': { saveDataR: saveDataStub } });
    var ut2 = new UserTimeline2({}, controller);
    const response = ut2.saveData('test');
    expect(response).to.equal('savedchanged');
  });

})
