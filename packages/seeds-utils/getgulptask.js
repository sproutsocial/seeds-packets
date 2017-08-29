const gulp = require('gulp');
const theo = require('theo');
const rename = require('gulp-rename');
const insert = require('gulp-insert');

const versions = require('./versions');

/**
 * 
 * @param {String} pkg The name of the package
 * @param {String} transform The registered Theo transform to use
 * @param {String} format The registered Theo format to use
 * @param {Object} opts Manipulate the path and the filename
 */
function getGulpTask(pkg, transform, format, opts = {}) {
  opts = {
    appendVersion: opts.appendVersion || false,
    dest: opts.dest || `dist`,
    filename: opts.filename || pkg,
    prependFile: opts.prependFile || '',
    appendFile: opts.appendFile || ''
  };
  return () => {
    return gulp
      .src(`./tokens.yml`)
      .pipe(theo.plugins.transform(transform))
      .pipe(theo.plugins.format(format))
      .pipe(
        rename({
          dirname: '',
          basename: opts.filename,
          suffix: opts.appendVersion ? '.' + versions[pkg].version : ''
        })
      )
      .pipe(insert.prepend(opts.prependFile ? opts.prependFile + '\n\n' : ''))
      .pipe(insert.append(opts.appendFile ? '\n\n' + opts.appendFile : '\n'))
      .pipe(gulp.dest(opts.dest));
  };
}

module.exports = getGulpTask;
