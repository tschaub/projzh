var forEachPoint = require('../util').forEachPoint;
var gcj02 = require('./gcj-02');

var PI = Math.PI;
var X_PI = PI * 3000 / 180;

var toGCJ02 = exports.toGCJ02 = forEachPoint(function(input, output, offset) {
  var x = input[offset] - 0.0065;
  var y = input[offset + 1] - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  output[offset] = z * Math.cos(theta);
  output[offset + 1] = z * Math.sin(theta);
  return output;
});

var fromGCJ02 = exports.fromGCJ02 = forEachPoint(function(input, output, offset) {
  var x = input[offset];
  var y = input[offset + 1];
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  output[offset] = z * Math.cos(theta) + 0.0065;
  output[offset + 1] = z * Math.sin(theta) + 0.006;
  return output;
});

exports.toWGS84 = function(input, opt_output, opt_dimension) {
  var output = toGCJ02(input, opt_output, opt_dimension);
  return gcj02.toWGS84(output, output, opt_dimension);
};

exports.fromWGS84 = function(input, opt_output, opt_dimension) {
  var output = gcj02.fromWGS84(input, opt_output, opt_dimension);
  return fromGCJ02(output, output, opt_dimension);
};
