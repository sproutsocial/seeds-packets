import { exec } from 'child_process';
import gulp from 'gulp';
import del from 'del';

import color from './tasks/color';
import docs from './tasks/docs';
import typography from './tasks/typography';

import theoTransforms from './theo/index';

gulp.task('clean', () => del.sync(['packages/**/dist', 'docs/downloads/*']));

gulp.task('build', [
  'clean',
  'color',
  'typography',
  'docs'
]);

gulp.task('serve', ['build'], () => {
  const jekyll = child.spawn('jekyll', ['serve', '--watch'], { cwd: './docs' });
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
  'build'
]);
