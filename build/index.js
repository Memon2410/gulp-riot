(function() {
  var compiler, gutil, through;

  gutil = require('gulp-util');

  through = require('through2');

  compiler = require('riot/compiler');

  module.exports = function() {
    var transform;
    transform = function(file, encoding, callback) {
      if (file.isNull()) {
        return callback(null, file);
      }
      if (file.isStream()) {
        return callback(new gutil.PluginError('gulp-article', 'Stream not supported'));
      }
      file.contents = new Buffer(compiler(file.contents.toString()));
      file.path = file.path.replace(/\.tag/, '.js');
      return callback(null, file);
    };
    return through.obj(transform);
  };

}).call(this);
