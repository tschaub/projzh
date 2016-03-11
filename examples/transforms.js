// according to https://www.google.com/search?q=beijing+latitude+longitude

var ll = [116.3833, 39.9167];
console.log('Geographic / WGS-84 [longitude, latitude] of Beijing', ll);

var gcj02 = projzh.datum.gcj02.fromWGS84(ll);
console.log('Geographic / GCJ-02 [longitude, latitude] of Beijing', gcj02);

var bmerc = projzh.ll2bmerc(ll);
console.log('Baidu Mercator / BD-09 [east, north] representation of the same', bmerc);

var smerc = projzh.ll2smerc(ll);
console.log('Spherical Mercator / WGS-84 [east, north] representation of the same', smerc);
