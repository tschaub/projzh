'use strict'

const sphericalMercator = require('../../lib/projection/spherical-mercator');
const expect = require('code').expect;
const lab = exports.lab = require('lab').script();

const inverseDelta = 1e-4;
const forwardDelta = 1e-2;

const cases = [{
  ll: [
    -180,
    -85
  ],
  sm: [
    -20037508.342789244,
    -19971868.880408563
  ]
}, {
  ll: [
    180,
    -85
  ],
  sm: [
    20037508.342789244,
    -19971868.880408563
  ]
}, {
  ll: [
    180,
    85
  ],
  sm: [
    20037508.342789244,
    19971868.880408563
  ]
}, {
  ll: [
    -180,
    85
  ],
  sm: [
    -20037508.342789244,
    19971868.880408563
  ]
}];

lab.experiment('sphericalMercator', _ => {

  lab.experiment('forward()', _ => {
    cases.forEach((c, i) => {
      lab.test(`case ${i}`, done => {
        const sm = sphericalMercator.forward(c.ll.slice());
        expect(sm[0]).to.be.about(c.sm[0], forwardDelta);
        expect(sm[1]).to.be.about(c.sm[1], forwardDelta);
        done();
      });
    });
  });

  lab.experiment('inverse()', _ => {
    cases.forEach((c, i) => {
      lab.test(`case ${i}`, done => {
        const ll = sphericalMercator.inverse(c.sm.slice());
        expect(ll[0]).to.be.about(c.ll[0], inverseDelta);
        expect(ll[1]).to.be.about(c.ll[1], inverseDelta);
        done();
      });
    });
  });

});
