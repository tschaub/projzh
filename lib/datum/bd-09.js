var forEachPoint = require('../util').forEachPoint;
var gcj02 = require('./gcj-02');

var PI = Math.PI;
var X_PI = PI * 3000 / 180;

function toGCJ02(input, output, offset) {
  var x = input[offset] - 0.0065;
  var y = input[offset + 1] - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  output[offset] = z * Math.cos(theta);
  output[offset + 1] = z * Math.sin(theta);
  return output;
}

function fromGCJ02(input, output, offset) {
  var x = input[offset];
  var y = input[offset + 1];
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  output[offset] = z * Math.cos(theta) + 0.0065;
  output[offset + 1] = z * Math.sin(theta) + 0.006;
  return output;
}

exports.toWGS84 = forEachPoint(function(input, output, offset) {
  toGCJ02(input, output, offset);
  return gcj02.toWGS84(output, output, offset);
});

exports.fromWGS84 = forEachPoint(function(input, output, offset) {
  gcj02.fromWGS84(input, output, offset);
  return fromGCJ02(output, output, offset);
});
