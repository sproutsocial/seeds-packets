const del = require('del');
const fs = require('fs');
const globby = require('globby');
const gulp = require('gulp');
const rename = require('gulp-rename');
const nodePath = require('path');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const merge = require('merge-stream');
const versions = require('./versions');

const seedsIncludes = globby.sync(`${process.cwd()}/packages/seeds-*/dist`).map(path => {
  return {
    path: `${path}/**/*`
  };
});

gulp.task('clean', () => {
  return del(['packages/seeds-docs/public/static/*']);
});

gulp.task('docs-copy', done => {
  const merged = merge();
  seedsIncludes.forEach(file => {
    merged.add(gulp.src(file.path).pipe(gulp.dest('packages/seeds-docs/public/static/downloads/')));
  });
  return merged;
});

gulp.task('docs-files', done => {
  // Write JSON file of versions, excluding the build package
  fs.writeFile(
    './packages/seeds-docs/public/static/versions.json',
    JSON.stringify(versions, (key, value) => (key === 'seeds' ? undefined : value)),
    err => done(err)
  );
});

gulp.task('docs', gulp.series(['clean', 'docs-copy', 'docs-files']));
