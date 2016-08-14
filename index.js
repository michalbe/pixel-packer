'use strict';

var getFiles = require('./utils/getFiles');

getFiles('./trash', /\.png$/, function(file) {
  console.log('hello', file);
});
