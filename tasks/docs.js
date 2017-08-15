const fs = require('fs');
const gulp = require('gulp');
const globby = require('globby');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const versions = require('../packages/seeds-util/versions');

const seedsIncludes = globby.sync(`${process.cwd()}/packages/seeds-*/dist`);
const copyDocs = globby.sync(`${process.cwd()}/packages/seeds-*/docs`).map(path => path + '/**/*');

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

gulp.task('docs-copy', () => {
  return gulp.src(copyDocs).pipe(gulp.dest('docs'));
});

gulp.task('docs-files', done => {
  const versionsYaml = Object.keys(versions).map(pkg => `  ${pkg}: ${versions[pkg]}`).join('\n');

  gulp
    .src('docs/_config.yml')
    .pipe(replace(/(# #versions)[^]+(# \/versions)/gm, '$1\n' + versionsYaml + '\n$2'))
    .pipe(gulp.dest('docs'));

  // Write JSON file of versions, excluding the build package
  fs.writeFile(
    './docs/downloads/versions.json',
    JSON.stringify(versions, (key, value) => (key === 'seeds' ? undefined : value)),
    err => done(err)
  );
});

gulp.task('docs', gulp.series(['docs-css', 'docs-copy', 'docs-files']));
