'use strict';
/* global p */

(function() {
  var palette={};
  for (var i in p) {
    var color = p[i];
    color = color.split('.');
    color = color.map(function(part) {
      part = parseInt(part, 16);
      return Number.isNaN(part) ? 255 : part;
    });

    palette[i] = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + color[3] + ')';
  }

  console.log(palette);
})();
