var forEachPoint = require('../util').forEachPoint;

var PI = Math.PI;
var AXIS = 6378245.0;
var OFFSET = 0.00669342162296594323;  // (a^2 - b^2) / a^2

function delta(wgLon, wgLat) {
  var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
  var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
  var radLat = wgLat / 180.0 * PI;
  var magic = Math.sin(radLat);
  magic = 1 - OFFSET * magic * magic;
  var sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((AXIS * (1 - OFFSET)) / (magic * sqrtMagic) * PI);
  dLon = (dLon * 180.0) / (AXIS / sqrtMagic * Math.cos(radLat) * PI);
  return [dLon, dLat];
}

function outOfChina(lon, lat) {
  if (lon < 72.004 || lon > 137.8347) {
    return true;
  }
  if (lat < 0.8293 || lat > 55.8271) {
    return true;
  }
  return false;
}

function transformLat(x, y) {
  var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
  return ret;
}

function transformLon(x, y) {
  var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
  return ret;
}

exports.toWGS84 = forEachPoint(function(input, output, offset) {
  var lng = input[offset];
  var lat = input[offset + 1];
  if (!outOfChina(lng, lat)) {
    var deltaD = delta(lng, lat);
    lng = lng - deltaD[0];
    lat = lat - deltaD[1];
  }
  output[offset] = lng;
  output[offset + 1] = lat;
});

exports.fromWGS84 = forEachPoint(function(input, output, offset) {
  var lng = input[offset];
  var lat = input[offset + 1];
  if (!outOfChina(lng, lat)) {
    var deltaD = delta(lng, lat);
    lng = lng + deltaD[0];
    lat = lat + deltaD[1];
  }
  output[offset] = lng;
  output[offset + 1] = lat;
});
