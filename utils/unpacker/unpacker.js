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

    palette[i] = [color[0], color[1], color[2], color[3]];
  }

  //14-18&21&17&23&322&15&235&4215&231&5634214&22&522&4214&2722&722&14&22&522&6212&21&1254&6211&2562127571&8211&251&21293&0212&21&11&293&0216&24&0217&21&11&21&18&212&2.
  console.log(palette);

  m = m.split('.');
  m.forEach(function(pixel) {
    pixel = pixel.split('-');
    var width = pixel[0];
    pixel = pixel[1];
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = width;

    var context = canvas.getContext('2d');
    var pixelData = [];
    var lastElement;
    var currentElement = pixel[0];
    for (var i = 0, l = pixel.length; i < l; i++) {
      var color = pixel[i];
      pixelData.push(
        palette[pixel[i]][0],
        palette[pixel[i]][1],
        palette[pixel[i]][2],
        palette[pixel[i]][3]
      );
    }
  });
})();
