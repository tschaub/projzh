var gcj02 = require('./gcj-02');

var PI = Math.PI;
var X_PI = PI * 3000 / 180;

function toGCJ02(input, output, dimension) {
  var len = input.length;
  for (var i = 0; i < len; i += dimension) {
    var x = input[i] - 0.0065;
    var y = input[i + 1] - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    output[i] = z * Math.cos(theta);
    output[i + 1] = z * Math.sin(theta);
  }
  return output;
}

function fromGCJ02(input, output, dimension) {
  var len = input.length;
  for (var i = 0; i < len; i += dimension) {
    var x = input[i];
    var y = input[i + 1];
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
    output[i] = z * Math.cos(theta) + 0.0065;
    output[i + 1] = z * Math.sin(theta) + 0.006;
  }
  return output;
}

exports.toWGS84 = function(input, opt_output, opt_dimension) {
  var len = input.length;
  var dimension = opt_dimension ? opt_dimension : 2;
  var output;
  if (opt_output) {
    output = opt_output;
  } else {
    if (dimension !== 2) {
      output = input.slice();
    } else {
      output = new Array(len);
    }
  }
  return gcj02.toWGS84(toGCJ02(input, output, dimension), output, dimension);
};

exports.fromWGS84 = function(input, opt_output, opt_dimension) {
  var len = input.length;
  var dimension = opt_dimension ? opt_dimension : 2;
  var output;
  if (opt_output) {
    output = opt_output;
  } else {
    if (dimension !== 2) {
      output = input.slice();
    } else {
      output = new Array(len);
    }
  }
  return fromGCJ02(gcj02.fromWGS84(input, output, dimension), output, dimension);
};
