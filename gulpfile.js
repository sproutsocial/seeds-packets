const spawn = require('child_process').spawn;
const gulp = require('gulp');
const del = require('del');
const gulpUtil = require('gulp-util');
const docs = require('./packages/seeds-utils/docs');

gulp.task('jekyll', cb => {
  const jekyll = spawn('jekyll', ['build'], {cwd: './docs'});
  const jekyllLogger = buffer => {
    buffer.toString().split(/\n/).forEach(message => gulpUtil.log('Jekyll: ' + message));
  };
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
  jekyll.on('close', cb);
});

gulp.task('watch', () => {
  const jekyll = spawn('jekyll', ['serve', '--watch'], {cwd: './docs'});
  const jekyllLogger = buffer => {
    buffer.toString().split(/\n/).forEach(message => gulpUtil.log('Jekyll: ' + message));
  };
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);

  gulp.watch(['docs/_sass/**/*.scss'], gulp.parallel(['docs-css']));
  gulp.watch(['packages/**/*'], gulp.parallel(['docs']));
});

gulp.task('serve', gulp.series(['docs', gulp.parallel(['watch'])]));

gulp.task('default', gulp.series(['docs', 'jekyll']));
