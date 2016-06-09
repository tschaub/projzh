'use strict';

const expect = require('code').expect;
const lab = exports.lab = require('lab').script();
const projzh = require('../index');

const deltaDegree = 1e-4;
const deltaMeter = 1e-2;

const data = {
  ll: [73, 1, 137, 55],
  bmerc: [8127480.603199672, 111352.77538914987, 15252717.919720594, 7328184.397722913],
  smerc: [8126322.82790897, 111325.14286638466, 15250770.23867848, 7361866.113051189]
};

lab.experiment('ll2bmerc()', _ => {
  lab.test('transforms Geographic/WGS84 to Baidu Mercator', done => {
    const output = projzh.ll2bmerc(data.ll);
    expect(output).to.have.length(data.bmerc.length);
    output.forEach((value, i) => {
      expect(value).to.be.about(data.bmerc[i], deltaMeter);
    });
    done();
  });
});

lab.experiment('bmerc2ll()', _ => {
  lab.test('transforms Baidu Mercator to Geographic/WGS84', done => {
    const output = projzh.bmerc2ll(data.bmerc);
    expect(output).to.have.length(data.ll.length);
    output.forEach((value, i) => {
      expect(value).to.be.about(data.ll[i], deltaDegree);
    });
    done();
  });
});

lab.experiment('ll2smerc()', _ => {
  lab.test('transforms Geographic/WGS84 to Spherical Mercator', done => {
    const output = projzh.ll2smerc(data.ll);
    expect(output).to.have.length(data.smerc.length);
    output.forEach((value, i) => {
      expect(value).to.be.about(data.smerc[i], deltaMeter);
    });
    done();
  });
});

lab.experiment('smerc2ll()', _ => {
  lab.test('transforms Spherical Mercator to Geographic/WGS84', done => {
    const output = projzh.smerc2ll(data.smerc);
    expect(output).to.have.length(data.ll.length);
    output.forEach((value, i) => {
      expect(value).to.be.about(data.ll[i], deltaDegree);
    });
    done();
  });
});

lab.experiment('bmerc2smerc()', _ => {
  lab.test('transforms Baidu Mercator to Spherical Mercator', done => {
    const output = projzh.bmerc2smerc(data.bmerc);
    expect(output).to.have.length(data.smerc.length);
    output.forEach((value, i) => {
      // This ±6m delta is suspicious.
      // TODO: confirm with bmap.js implementation
      expect(value).to.be.about(data.smerc[i], 6);
    });
    done();
  });
});

lab.experiment('smerc2bmerc()', _ => {
  lab.test('transforms Spherical Mercator to Baidu Mercator', done => {
    const output = projzh.smerc2bmerc(data.smerc);
    expect(output).to.have.length(data.bmerc.length);
    output.forEach((value, i) => {
      expect(value).to.be.about(data.bmerc[i], deltaMeter);
    });
    done();
  });
});
