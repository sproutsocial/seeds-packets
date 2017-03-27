import { spawn } from 'child_process';
import gulp from 'gulp';
import del from 'del';
import open from 'gulp-open';
import gulpUtil from 'gulp-util';

import color from './tasks/color';
import docs from './tasks/docs';
import typography from './tasks/typography';

import theoTransforms from './theo/index';

gulp.task('clean', () => del.sync([
  'packages/seeds-*/dist',
  'docs/downloads/*',
  'docs/css'
]));

gulp.task('build', [
  'clean',
  'color',
  'networkcolor',
  'typography'
]);

gulp.task('serve', ['build', 'docs'], () => {
  const jekyll = spawn('jekyll', ['serve', '--watch'], { cwd: './docs' });
  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gulpUtil.log('Jekyll: ' + message));
  };
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
  setTimeout(() => {
    gulp.src('')
      .pipe(open({
        uri: 'http://localhost:4000/seeds/'
      }));
  }, 4000);
});

gulp.task('default', [
  'build',
  'docs'
]);
