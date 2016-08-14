'use strict';

var findFiles = require('./utils/findFiles');
var getPixels = require('get-pixels');
var _ = require('underscore');

var palette = {};

var palleteNameHelper = '1234567890' +
  'qwertyuiopasdfghjklzxcvbnm' +
  '$!@#%^()+*_{}[]:\\|<>?,./';

var paletteNameHelperIndex = 0;

findFiles('./trash', /.png$/, []).then(function(files) {
  var output = '';
  var lastColor = '';
  var lastColorCount = 0;
  var filesCount = files.length;
  var finishedFiles = 0;
  files.forEach(function(file, index) {
    getPixels(file, function(err, pixels) {
      finishedFiles++;

      if (err) {
        console.log('nope');
        return;
      }

      // each File starts with width in pixels
      output += pixels.shape[0] + '-';
      var data = pixels.data;
      for (var i = 0, j = data.length; i < j; i += 4) {
        var color =
        (data[i].toString(16) === 'ff' ? '' : data[i].toString(16)) + '.' +
        (data[i+1].toString(16) === 'ff' ? '' : data[i+1].toString(16)) + '.' +
        (data[i+2].toString(16) === 'ff' ? '' : data[i+2].toString(16)) + '.' +
        (data[i+3].toString(16) === 'ff' ? '' : data[i+3].toString(16)) + '.';

        var colorOnPalette = _.invert(palette)[color];
        if (!colorOnPalette) {
          colorOnPalette = palleteNameHelper[paletteNameHelperIndex];
          palette[colorOnPalette] = color;
          paletteNameHelperIndex++;
        }

        if (lastColor === color) {
          lastColorCount++;
        } else {
          if (lastColorCount === 0) {
            output += colorOnPalette.toString();
          } else {
            output += lastColorCount + '&' + colorOnPalette.toString();
          }
          lastColorCount = 0;
          lastColor = color;
        }
      }
      output += '.';

      console.log(finishedFiles, filesCount);
      if (finishedFiles === filesCount-1) {
        output = 'var p=' +
          JSON.stringify(palette)
            .replace(/\"([^(\")"]+)\":/g,'$1:')+';var m=\'' + output + '\';';
        console.log(output);
      }
    });
  });
}).catch(function(error) {
  console.log('Error: ' + error);
});
