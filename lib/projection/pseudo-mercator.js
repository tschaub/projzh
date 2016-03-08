var R = 6378137;
var MAX_LATITUDE = 85.0511287798;

exports.forward = function(point) {
  var d = Math.PI / 180;
  var max = MAX_LATITUDE;
  var lat = Math.max(Math.min(max, point.getY()), -max);
  var sin = Math.sin(lat * d);

  var x = R * point[0] * d;
  var y = R * Math.log((1 + sin) / (1 - sin)) / 2;

  point[0] = x;
  point[1] = y;

  return point;
};

exports.inverse = function(point) {
  var d = 180 / Math.PI;
  var lng = point[0] * d / R;
  var lat = (2 * Math.atan(Math.exp(point[1] / R)) - (Math.PI / 2)) * d;

  point[0] = lng;
  point[1] = lat;

  return point;
};
