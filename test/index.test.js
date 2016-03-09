'use strict'

const baidu = require('../lib/index');
const expect = require('code').expect;
const lab = exports.lab = require('lab').script();

const delta = 1e-2;

const data = {
  ll: [72.004, 0.8293, 137.8347, 55.8271],
  bmerc: [8015948.731472805, 91836.26763588775, 15345592.295399487, 7490041.134398721],
  smerc: [8015139.8184281085, 91769.09457092141, 15344693.738606343, 7524571.612939372]
};

lab.experiment('ll2bmerc()', _ => {
  lab.test('transforms Geographic/WGS84 to Baidu Mercator', done => {
    const output = baidu.ll2bmerc(data.ll);
    expect(output).to.have.length(data.bmerc.length);
    output.forEach((value, i) => {
      expect(value).to.be.about(data.bmerc[i], delta);
    });
    done();
  });
});

lab.experiment('bmerc2ll()', _ => {
  lab.test('transforms Baidu Mercator to Geographic/WGS84', done => {
    const output = baidu.bmerc2ll(data.bmerc);
    expect(output).to.have.length(data.ll.length);
    output.forEach((value, i) => {
      expect(value).to.be.about(data.ll[i], delta);
    });
    done();
  });
});

lab.experiment('bmerc2smerc()', _ => {
  lab.test('transforms Baidu Mercator to Spherical Mercator', done => {
    const output = baidu.bmerc2smerc(data.bmerc);
    expect(output).to.have.length(data.smerc.length);
    output.forEach((value, i) => {
      expect(value).to.be.about(data.smerc[i], delta);
    });
    done();
  });
});
