'use strict';

var path = require('path');
var fs=require('fs');

var getFiles = function(startPath, filter, callback) {

  if (!fs.existsSync(startPath)){
      console.log('Directory not found - ',startPath);
      return;
  }

  var files = fs.readdirSync(startPath);
  for(var i=0; i<files.length ;i++) {
    var filename = path.join(startPath,files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
        getFiles(filename,filter,callback); //recurse
    } else if (filter.test(filename)){
       callback(filename);
    }
  }
};

getFiles('./trash',/\.png$/,function(filename) {
  console.log('-- found: ',filename);
});

module.exports = getFiles;
