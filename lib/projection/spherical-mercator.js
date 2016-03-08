var RADIUS = 6378137;
var MAX_LATITUDE = 85.0511287798;
var RAD_PER_DEG = Math.PI / 180;

exports.forward = function(point) {
  var max = MAX_LATITUDE;
  var lat = Math.max(Math.min(max, point[1]), -max);
  var sin = Math.sin(lat * RAD_PER_DEG);

  var x = RADIUS * point[0] * RAD_PER_DEG;
  var y = RADIUS * Math.log((1 + sin) / (1 - sin)) / 2;

  point[0] = x;
  point[1] = y;

  return point;
};

exports.inverse = function(point) {
  var lng = point[0] / RADIUS / RAD_PER_DEG;
  var lat = (2 * Math.atan(Math.exp(point[1] / RADIUS)) - (Math.PI / 2)) / RAD_PER_DEG;

  point[0] = lng;
  point[1] = lat;

  return point;
};
