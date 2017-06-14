import fs from 'fs';
import gulp from 'gulp';
import globby from 'globby';
import replace from 'gulp-replace';
import sass from 'gulp-sass';
import versions from '../util/versions';

gulp.task('docs-css', ['typography'], () => {
  return gulp.src('docs/_sass/styles.scss')
    .pipe(sass({
      includePaths: globby.sync(process.cwd() + '/packages/seeds-*/dist/')
    }).on('error', sass.logError))
    .pipe(gulp.dest('docs/css'));
});

gulp.task('docs', ['docs-css'], (cb) => {
  const versionsYaml = Object.keys(versions).map((pkg) => `  ${pkg}: ${versions[pkg]}`).join('\n');

  gulp.src('docs/_config.yml')
    .pipe(replace(/(# #versions)[^]+(# \/versions)/gm, '\$1\n' + versionsYaml + '\n\$2'))
    .pipe(gulp.dest('docs'));

  // Write JSON file of versions, excluding the build package
  fs.writeFile(
    './docs/downloads/versions.json',
    JSON.stringify(versions, (key, value) => key === 'seeds' ? undefined : value),
    (err) => cb(err)
  );
});