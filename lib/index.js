var baiduMercator = require('./projection/baidu-mercator');
var bd09 = require('./datum/bd-09');
var pseudoMercator = require('./projection/pseudo-mercator');

exports.psmerc2bmerc = function(point) {
  return baiduMercator.forward(bd09.fromWGS84(pseudoMercator.inverse(point)));
};

exports.bmerc2psmerc = function(point) {
  return pseudoMercator.forward(bd09.toWGS84(baiduMercator.inverse(point)));
};

exports.bmerc2ll = function(point) {
  return bd09.toWGS84(baiduMercator.inverse(point));
};

exports.ll2bmerc = function(point) {
  baiduMercator.forward(bd09.fromWGS84(point));
};
