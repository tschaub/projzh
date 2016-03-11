
exports.forEachPoint = function(func) {
  return function(input, opt_output, opt_dimension) {
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
    for (var offset = 0; offset < len; offset += dimension) {
      func(input, output, offset)
    }
    return output;
  };
};
