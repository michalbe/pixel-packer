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

  //14-q6w4q7we3rwq5we5rwq4w1e4rwq2wq2t3yuwq1wiwqwotwotw1qwp1iwqt4aw1p2iwqt4aw4itw1ot1oawq2wt1w1o3swq3w1qwd3fwq6w4fwq7w1q1w1q8wq2w.
  console.log(palette);

  m = m.split('.');
  m.forEach(function(pixel) {
    pixel = pixel.split('-');
    var width = pixel[0];
    pixel = pixel[1];
    var pixelData = [];
    var lastElement;
    var currentElement = pixel[0];
    for (var i = 0, l = pixel.length; i < l; i++) {
      var color = pixel[i];
      if (/\d/.test(pixel[i])) {
        // is number
        for (var x = 0; x<pixel[i]; x++) {
          pixelData.push(
            palette[lastElement][0],
            palette[lastElement][1],
            palette[lastElement][2],
            palette[lastElement][3]
          );
        }
      } else {
        pixelData.push(
          palette[pixel[i]][0],
          palette[pixel[i]][1],
          palette[pixel[i]][2],
          palette[pixel[i]][3]
        );

        lastElement = pixel[i];
      }
    }

    // console.log(pixelData);
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = width;
    var height = canvas.height = pixelData.length/4/width;
    var ctx = canvas.getContext('2d');
    var imgData = ctx.getImageData(0,0,width,height);
    pixelData.forEach(function(a,i) {
      imgData.data[i] = a;
    });
    ctx.putImageData(imgData, 0,0);
  });
})();
