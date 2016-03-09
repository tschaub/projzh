# projzh

This package provides utilities for working with coordinate reference systems used by Baidu maps.

The code is ported from the [`proj4m` project](https://github.com/MapTalks/proj4m) which is licensed under the GPL v3.

# Rough details

As far as I understand, the coordinate reference system for Baidu Maps uses a custom Mercator projection and the BD-09 datum.  The BD-09 datum applies additional transforms on top of the GCJ-02 datum.

So, to transform a point in geographic coordinates and the WGS-84 datum to the CRS used by Baidu, first transform from WGS-84 to BD-09 (which itself uses the GCJ-09 transform), and then do the forward transform to Baidu Mercator.

```js
baiduMercator.forward(bd09.fromWGS84(point))
```

To transform a point in the CRS used by Baidu to geographic/WGS-84, first do the inverse transform from Baidu Mercator, then do the transform from BD-09 to WGS-84 (which itself uses the GCJ-09 transform).

```js
bd09.toWGS84(baiduMercator.inverse(point))
```

This package exports the functions above in the `lib/datum/bd-09` and `lib/projection/baidu-mercator` modules.  Additional transforms for transforms to/from Spherical Mercator are available in the `index` module.

# Installation

    npm install projzh

The utility functions can be used in Node or in browsers with a module bundler.

# License

As a port of the [`proj4m` project](https://github.com/MapTalks/proj4m), this qualifies as a derivative work and caries the same [GPL v3 license](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)).
