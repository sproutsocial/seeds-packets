const fs = require('fs');
const del = require('del');
const gulp = require('gulp');
const theo = require('theo');
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const upperFirst = require('lodash.upperfirst');
const cssPropertyName = require('@sproutsocial/seeds-utils/css-property-name');
const sassVar = require('@sproutsocial/seeds-utils/sassvar').sassVar;
const suitCssName = require('@sproutsocial/seeds-utils/sassvar').suitCssName;
const javascriptConst = require('@sproutsocial/seeds-utils/constantcase').javascriptConst;
const makeDir = require('make-dir');

const getGulpTask = require('@sproutsocial/seeds-utils/getgulptask');

const typographyTokensPath = './tokens.yml';

require('@sproutsocial/seeds-utils/theo');

gulp.task('clean', () => {
  return del(['dist/*']);
});

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

gulp.task('typography-scss', getGulpTypographyTask('web', 'scss', {appendFile: typographyFunction}));

gulp.task('typography-css', getGulpTypographyTask('web', 'custom-properties.css'));

gulp.task('typography-js', getGulpTypographyTask('js', 'common.js'));

gulp.task(
  'typography-js-unitless',
  getGulpTypographyTask('js', 'common-unitless.js', {filename: 'seeds-typography-unitless'})
);

gulp.task(
  'typography-sketch',
  getGulpTypographyTask('sketch', 'sketchtext.json', {
    dest: 'dist',
    appendVersion: true
  })
);

gulp.task('typography-docs', done => {
  theo.plugins
    .file(typographyTokensPath)
    .pipe(theo.plugins.transform('web'))
    .pipe(
      theo.plugins.getResult(result => {
        const tokens = JSON.parse(result);
        const tokensJson = tokens.propKeys.map(key => {
          const prop = tokens.props[key];
          return {
            deprecated: !!prop.deprecated,
            app: upperFirst(prop.name),
            sass:
              prop.category === 'font size'
                ? `@include ${suitCssName(prop.package, prop.name)};`
                : sassVar(prop.package, prop.name),
            javascript:
              typeof prop.value == 'object'
                ? `{ style: ${javascriptConst(prop.package, prop.name)} }`
                : javascriptConst(prop.package, prop.name),
            css: cssPropertyName(prop.package, prop.name),
            category: prop.category,
            value:
              typeof prop.value == 'object'
                ? {
                    fontSize: prop.value.value,
                    lineHeightProportional: prop.value.rules && prop.value.rules['line-height'],
                    lineHeightPx:
                      prop.value.rules && `${prop.value.rules['line-height'] * parseInt(prop.value.value, 10)}px`
                  }
                : prop.value
          };
        });

        fs.writeFileSync('dist/tokens.json', `${JSON.stringify(tokensJson)}`);
        done();
      })
    );
});

gulp.task(
  'default',
  gulp.series([
    'clean',
    gulp.parallel([
      'typography-css',
      'typography-scss',
      'typography-js',
      'typography-js-unitless',
      'typography-sketch'
    ]),
    'typography-docs'
  ])
);
