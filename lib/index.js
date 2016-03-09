var baiduMercator = require('./projection/baidu-mercator');
var bd09 = require('./datum/bd-09');
var sphericalMercator = require('./projection/spherical-mercator');

exports.smerc2bmerc = function(input, opt_output, opt_dimension) {
  var output = sphericalMercator.inverse(input, opt_output, opt_dimension);
  output = bd09.fromWGS84(output, output, opt_dimension);
  return baiduMercator.forward(output, output, opt_dimension);
};

exports.bmerc2smerc = function(input, opt_output, opt_dimension) {
  var output = baiduMercator.inverse(input, opt_output, opt_dimension);
  output = bd09.toWGS84(output, output, opt_dimension);
  return sphericalMercator.forward(output, output, opt_dimension);
};

exports.bmerc2ll = function(input, opt_output, opt_dimension) {
  var output = baiduMercator.inverse(input, opt_output, opt_dimension);
  return bd09.toWGS84(output, output, opt_dimension);
};

exports.ll2bmerc = function(input, opt_output, opt_dimension) {
  var output = bd09.fromWGS84(input, opt_output, opt_dimension);
  return baiduMercator.forward(output, output, opt_dimension);
};

exports.ll2smerc = sphericalMercator.forward;

exports.smerc2ll = sphericalMercator.inverse;
