'use strict'

const bd09 = require('../../datum/bd-09');
const expect = require('code').expect;
const gcj02 = require('../../datum/gcj-02');
const lab = exports.lab = require('lab').script();

lab.experiment('GCJ-02 to BD-09', _ => {

  lab.test('expected transforms', done => {
    const expected = [
      114.69490414027017, 33.639096507711685,
      114.69488614273101, 33.63804850387785,
      114.69500713986416, 33.63794251496537,
      114.69578412001135, 33.63793958798685,
      114.6959281162725, 33.637965601694006,
      114.69751307493384, 33.63795775348674
    ];

    const points = [
      114.68837663801743, 33.63312016454496,
      114.68835840204522, 33.632072446353945,
      114.68848002806972, 33.63196427051657,
      114.68926112541861, 33.63194729708501,
      114.68940588838505, 33.6319707051534,
      114.69099925796665, 33.6319341604661
    ];

    const actual = bd09.fromWGS84(gcj02.toWGS84(points));

    expect(actual).to.deep.equal(expected);
    done();
  });

});
