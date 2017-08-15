const del = require('del');
const fs = require('fs');
const globby = require('globby');
const gulp = require('gulp');
const nodePath = require('path');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const versions = require('@sproutsocial/seeds-utils/versions');

const seedsIncludes = globby.sync(`${process.cwd()}/packages/seeds-*/dist`);
const copyDocs = globby.sync(`${process.cwd()}/packages/seeds-*`).map(path => {
  const packet = nodePath.basename(path).split('-')[1];
  return {
    'path': path + '/'+packet+'/**/*',
    'package': packet
  };
});

gulp.task('clean', () => {
  return del(['docs/_packets/*']);
});

gulp.task('docs-css', () => {
  return gulp
    .src('docs/_sass/styles.scss')
    .pipe(
      sass({
        includePaths: seedsIncludes
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('docs/css'));
});

gulp.task('docs-copy', done => {
  copyDocs.forEach((doc) => {
    gulp.src(doc.path).pipe(gulp.dest('docs/_packets/' + doc.package));
  });
  done();
});

gulp.task('docs-files', done => {
  const versionsYaml = Object.keys(versions).map(pkg => `  ${pkg}: ${versions[pkg]}`).join('\n');

  gulp
    .src('docs/_config.yml')
    .pipe(replace(/(# #versions)[^]+(# \/versions)/gm, '$1\n' + versionsYaml + '\n$2'))
    .pipe(gulp.dest('docs'));

  // Write JSON file of versions, excluding the build package
  fs.writeFile(
    './docs/versions.json',
    JSON.stringify(versions, (key, value) => (key === 'seeds' ? undefined : value)),
    err => done(err)
  );
});

gulp.task('docs', gulp.series(['clean', 'docs-css', 'docs-copy', 'docs-files']));
