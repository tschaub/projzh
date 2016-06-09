'use strict';

const baiduMercator = require('../../projection/baidu-mercator');
const expect = require('code').expect;
const lab = exports.lab = require('lab').script();

const inverseDelta = 1e-4;
const forwardDelta = 1e-2;

const cases = [{
  ll: [
    72.01421676128244,
    0.8367788448845025
  ],
  bm: [
    8016673.168576939,
    92523.63565165037
  ]
}, {
  ll: [
    72.01577158351537,
    55.83353212549679
  ],
  bm: [
    8016846.25,
    7489653.42
  ]
}, {
  ll: [
    137.8436809381955,
    0.8359606206992264
  ],
  bm: [
    15344855.34,
    92433.16
  ]
}, {
  ll: [
    137.8500713872502,
    55.83597897112281
  ],
  bm: [
    15345566.72,
    7490137.41
  ]
}, {
  ll: [
    73.13470409826147,
    5.6212751357384985
  ],
  bm: [
    8141406.61,
    622541.72
  ]
}];

lab.experiment('baiduMercator', _ => {

  lab.experiment('forward()', _ => {
    cases.forEach((c, i) => {
      lab.test(`case ${i}`, done => {
        const bm = baiduMercator.forward(c.ll.slice());
        expect(bm[0]).to.be.about(c.bm[0], forwardDelta);
        expect(bm[1]).to.be.about(c.bm[1], forwardDelta);
        done();
      });
    });
  });

  lab.experiment('inverse()', _ => {
    cases.forEach((c, i) => {
      lab.test(`case ${i}`, done => {
        const ll = baiduMercator.inverse(c.bm.slice());
        expect(ll[0]).to.be.about(c.ll[0], inverseDelta);
        expect(ll[1]).to.be.about(c.ll[1], inverseDelta);
        done();
      });
    });
  });

});
