import fs from 'fs';
import gulp from 'gulp';
import theo from 'theo';
import insert from 'gulp-insert';
import rename from 'gulp-rename';

import getGulpTask from '../util/getgulptask';

const typographyTokensPath = 'packages/seeds-typography/tokens.yml';

const typographyFunction = `$Typography-unit: px !default;
$Typography-size--base: $Typography-size--400 !default;
@function Typography-getunit($size) {
  @if $Typography-unit == "rem" {
    $remSize: $size / $Typography-size--base;
    @return #{$remSize}rem;
  }
  @else {
    @return $size;
  }
}
`;

function getGulpTypographyTask(transform, format, opts = {}) {
  return getGulpTask('seeds-typography', transform, format, opts);
}

gulp.task('typography-scss', getGulpTypographyTask('web', 'scss', { appendFile: typographyFunction }));
gulp.task('typography-js', getGulpTypographyTask('js', 'common.js'));
gulp.task('typography-sketch', getGulpTypographyTask('sketch', 'sketchtext.json', {
  dest: 'docs/downloads',
  appendVersion: true
}));

gulp.task('typography', [
  'typography-scss',
  'typography-js'
]);
