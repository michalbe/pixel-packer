'use strict';

var Q = require('q');
var async = require('async');
var path = require('path');
var fs = require('fs');

function findFiles(startPath, filter, files){
  var deferred;
  deferred = Q.defer();
  Q.nfcall(fs.readdir, startPath).then(function(list) {
    var ideferred = Q.defer();
    async.each(list, function(item, done) {
      return Q.nfcall(fs.stat, path.join(startPath, item))
        .then(function(stat) {
          if (stat.isDirectory()) {
            return findFiles(
              path.join(startPath, item), filter, files
            ).catch(function(error) {
                console.log(
                  'could not read path: ' +
                  error.toString()
                );
              })
              .finally(function() {
                return done();
               });
          } else if (filter.test(item)) {
            files.push(path.join(startPath, item));
            return done();
          } else {
            return done();
          }
        })
        .catch(function(error){
          ideferred.reject('Could not stat: ' + error.toString());
        });
    }, function() {
      return ideferred.resolve();
    });
    return ideferred.promise;
  }).then(function() {
    return deferred.resolve(files);
  }).catch(function(error) {
    deferred.reject('Could not read dir: ' + error.toString());
    return;
  });
  return deferred.promise;
}

module.exports = findFiles;
