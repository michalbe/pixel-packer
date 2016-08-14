'use strict';

var findFiles = require('./utils/findFiles');

findFiles('./trash', /.png$/, []).then(function(files) {
  console.log('hello', files);
}).catch(function(error) {
  console.log('Error: ' + error);
});
