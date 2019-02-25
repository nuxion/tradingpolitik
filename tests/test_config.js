const sinon = require('sinon');
const expect = require('chai').expect;
const conf = require('../lib/config.js');


describe('Config testing', function() {

  it('Test dotEnv value', () => {
    const env = conf.get('env');
    expect(env).to.equal('test');
  });

  it('Test json config value', () => {
    const mongodb = conf.get('mongodb.server');
    expect(mongodb).to.equal('mongodb');
  })

  it('Test default config value', ()=> {
    const twit = conf.get('twitter.timeout_ms');
    expect(twit).to.equal(60000);
  })


});
