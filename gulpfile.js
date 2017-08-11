const spawn = require('child_process').spawn;
const gulp = require('gulp');
const del = require('del');
const gulpUtil = require('gulp-util');

const docs = require('./tasks/docs');

gulp.task('clean', () => {
  return del(['docs/downloads/*']);
});

gulp.task('jekyll', () => {
  const jekyll = spawn('jekyll', ['serve', '--watch'], {cwd: './docs'});
  const jekyllLogger = buffer => {
    buffer.toString().split(/\n/).forEach(message => gulpUtil.log('Jekyll: ' + message));
  };
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', gulp.series(['docs', 'jekyll']));

gulp.task('default', gulp.series(['clean', 'docs']));
