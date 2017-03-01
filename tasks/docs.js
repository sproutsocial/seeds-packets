import fs from 'fs';
import gulp from 'gulp';
import replace from 'gulp-replace';
import versions from '../util/versions';

gulp.task('docs', (cb) => {
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