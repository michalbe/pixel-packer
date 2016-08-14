'use strict';

var findFiles = require('./utils/findFiles');
var getPixels = require('get-pixels');
var _ = require('underscore');

var palette = {};

var palleteNameHelper = '1234567890' +
  'qwertyuiopasdfghjklzxcvbnm' +
  '$!@#%^&*()_+{}[]:\\|<>?,./';

var paletteNameHelperIndex = 0;

findFiles('./trash', /[.png.jpg.gif]$/, []).then(function(files) {
  var output = '';
  files.forEach(function(file) {
    getPixels(file, function(err, pixels) {
      if (err) {
        console.log('nope');
        return;
      }

      // each File starts with width in pixels
      output += pixels.shape[0] + '-';
      for (var i = 0, j = pixels.data.length; i < j; i += 4) {
        var color = pixels.data[i].toString(16) + '.' +
          pixels.data[i+1].toString(16) + '.' +
          pixels.data[i+2].toString(16) + '.' +
          pixels.data[i+3].toString(16);

        var colorOnPalette = _.invert(palette)[color];
        if (!colorOnPalette) {
          colorOnPalette = palleteNameHelper[paletteNameHelperIndex];
          palette[colorOnPalette] = color;
          paletteNameHelperIndex++;
        }
        output += colorOnPalette.toString();
      }
      output += '.';
      console.log(palette, output);
    });
  });
}).catch(function(error) {
  console.log('Error: ' + error);
});
