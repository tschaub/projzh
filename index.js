var projection = require('./projection/index');
var datum = require('./datum/index');

exports.smerc2bmerc = function(input, opt_output, opt_dimension) {
  var output = projection.sphericalMercator.inverse(input, opt_output, opt_dimension);
  output = datum.bd09.fromWGS84(output, output, opt_dimension);
  return projection.baiduMercator.forward(output, output, opt_dimension);
};

exports.bmerc2smerc = function(input, opt_output, opt_dimension) {
  var output = projection.baiduMercator.inverse(input, opt_output, opt_dimension);
  output = datum.bd09.toWGS84(output, output, opt_dimension);
  return projection.sphericalMercator.forward(output, output, opt_dimension);
};

exports.bmerc2ll = function(input, opt_output, opt_dimension) {
  var output = projection.baiduMercator.inverse(input, opt_output, opt_dimension);
  return datum.bd09.toWGS84(output, output, opt_dimension);
};

exports.ll2bmerc = function(input, opt_output, opt_dimension) {
  var output = datum.bd09.fromWGS84(input, opt_output, opt_dimension);
  return projection.baiduMercator.forward(output, output, opt_dimension);
};

exports.ll2smerc = projection.sphericalMercator.forward;
exports.smerc2ll = projection.sphericalMercator.inverse;
exports.datum = datum;
exports.projection = projection;
