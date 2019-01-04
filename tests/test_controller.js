const sinon = require('sinon');
const expect = require('chai').expect;
const controller = require('../lib/controller');

describe('Controller', function(){
  
  const Timeline = controller.TimelineModel;

  after(() => controller.connection.connection.close())

  it('Greatest ID', async () => {
    const tweet = await controller.getGreatestId('cosmos_caos', Timeline);
    expect(tweet[0].id_str).to.equal('1067069307576827904');
  })
  it('Lowest ID', async () => {
    const tweet = await controller.getLowestId('cosmos_caos', Timeline);
    expect(tweet[0].id_str).to.equal('324161942392545282');
  })

})

