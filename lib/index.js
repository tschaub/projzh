var baiduMercator = require('./projection/baidu-mercator');
var bd09 = require('./datum/bd-09');
var sphericalMercator = require('./projection/spherical-mercator');

exports.smerc2bmerc = function(point) {
  return baiduMercator.forward(bd09.fromWGS84(sphericalMercator.inverse(point)));
};

exports.bmerc2smerc = function(point) {
  return sphericalMercator.forward(bd09.toWGS84(baiduMercator.inverse(point)));
};

exports.bmerc2ll = function(point) {
  return bd09.toWGS84(baiduMercator.inverse(point));
};

exports.ll2bmerc = function(point) {
  return baiduMercator.forward(bd09.fromWGS84(point));
};
