const fs = require('fs');
const del = require('del');
const gulp = require('gulp');
const theo = require('theo');
const upperFirst = require('lodash.upperfirst');
const cssPropertyName = require('@sproutsocial/seeds-utils/css-property-name');
const sassVar = require('@sproutsocial/seeds-utils/sassvar').sassVar;
const getGulpTask = require('@sproutsocial/seeds-utils/getgulptask');
const javascriptConst = require('@sproutsocial/seeds-utils/constantcase').javascriptConst;
const makeDir = require('make-dir');

const borderTokensPath = './tokens.yml';
require('@sproutsocial/seeds-utils/theo');

function getGulpBorderTask(transform, format, opts = {}) {
  return getGulpTask('seeds-border', transform, format, opts);
}

gulp.task('clean', () => {
  return del(['border/_generated/*']);
});

gulp.task('border-scss', getGulpBorderTask('web', 'scss'));

gulp.task('border-css', getGulpBorderTask('web', 'custom-properties.css'));

gulp.task('border-js', getGulpBorderTask('js', 'common.js'));

gulp.task('border-docs', done => {
  theo.plugins
    .file(borderTokensPath)
    .pipe(theo.plugins.transform('web'))
    .pipe(
      theo.plugins.getResult(result => {
        const tokens = JSON.parse(result);
        const easings = tokens.propKeys.map(key => {
          const prop = tokens.props[key];
          const {value, description, category} = prop;

          return {
            app: upperFirst(prop.name),
            sass: sassVar(prop.package, prop.name),
            css: cssPropertyName(prop.package, prop.name),
            javascript: javascriptConst(prop.package, prop.name),
            value,
            description,
            category
          };
        });

        fs.writeFileSync('dist/tokens.json', `${JSON.stringify(easings)}`);
        done();
      })
    );
});

gulp.task('default', gulp.series(['clean', gulp.parallel(['border-css', 'border-scss', 'border-js']), 'border-docs']));
