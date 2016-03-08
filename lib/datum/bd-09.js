var gcj02 = require('./gcj-02');

var PI = Math.PI;
var X_PI = PI * 3000.0 / 180.0;

function toGCJ02(point) {
  var x = point[0];
  var y = point[1];
  x = x - 0.0065;
  y = y - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  x = z * Math.cos(theta);
  y = z * Math.sin(theta);
  point[0] = x;
  point[1] = y;

  return point;
}

function fromGCJ02(point) {
  var x = point[0];
  var y = point[1];
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  y = z * Math.sin(theta) + 0.006;
  x = z * Math.cos(theta) + 0.0065;
  point[0] = x;
  point[1] = y;
  return point;
}


exports.toWGS84 = function(point) {
  return gcj02.toWGS84(toGCJ02(point));
};

exports.fromWGS84 = function(point) {
  return fromGCJ02(gcj02.fromWGS84(point));
};
