var es = require('event-stream');
var _ = require('lodash');
var hp = require('head-picker');
var gutil = require('gulp-util');

var PLUGIN_NAME = 'gulp-head-picker';

module.exports = function (options) {

  // Default options
  options = options || {};
  options.property = options.property || 'toc';
  options.hpOptions = options.hpOptions || {};

  return es.map(function (file, cb) {
    var res;

    if (file.isBuffer()) {
      try {
        res = hp(String(file.contents), options.hpOptions);
      } catch (e) {
        return cb(new gutil.PluginError(PLUGIN_NAME, e));
      }
      file[options.property] = res.toc;
      file.contents = new Buffer(res.contents);
      delete res.contents;
    } else if (file.isNull()) {
      return cb(null, file);
    } else  {
      // stream
      return cb(new gutil.PluginError(PLUGIN_NAME, 'gulp-head-picker: Cannot get headings in a stream'));
    }

    cb(null, file);
  });
};
