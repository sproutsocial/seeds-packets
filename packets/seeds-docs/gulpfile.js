const spawn = require('child_process').spawn;
const gulp = require('gulp');
const del = require('del');
const gulpUtil = require('gulp-util');
const fs = require('fs');
const globby = require('globby');
const rename = require('gulp-rename');
const nodePath = require('path');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const merge = require('merge-stream');
const versions = require('@sproutsocial/seeds-utils/versions');

const seedsDist = globby.sync('./node_modules/@sproutsocial/seeds-*/dist').map(path => {
  return {
    path: `${path}/**/*`
  };
});
const seedsAssets = globby.sync('./node_modules/@sproutsocial/seeds-*/docs/assets').map(path => {
  return {
    path: `${path}/**/*`
  };
});

gulp.task('clean', () => {
  return del(['static/*']);
});

gulp.task('docs-copy', done => {
  const merged = merge();
  seedsDist.forEach(file => {
    merged.add(gulp.src(file.path).pipe(gulp.dest('static/downloads/')));
  });
  seedsAssets.forEach(file => {
    merged.add(gulp.src(file.path).pipe(gulp.dest('static/assets/')));
  });
  return merged;
});

gulp.task('docs-files', done => {
  // Write JSON file of versions, excluding the build packet
  fs.writeFile(
    './static/versions.json',
    JSON.stringify(versions, (key, value) => (key === 'seeds' ? undefined : value)),
    err => done(err)
  );
});

gulp.task('docs', gulp.series(['clean', 'docs-copy', 'docs-files']));

gulp.task('default', gulp.series(['docs']));
