const fs = require('fs');
const del = require('del');
const gulp = require('gulp');
const theo = require('theo');
const upperFirst = require('lodash.upperfirst');
const sassVar = require('@sproutsocial/seeds-utils/sassvar').sassVar;
const getGulpTask = require('@sproutsocial/seeds-utils/getgulptask');
const javascriptConst = require('@sproutsocial/seeds-utils/constantcase').javascriptConst;
const makeDir = require('make-dir');

const tokensPath = './tokens.yml';
require('@sproutsocial/seeds-utils/theo');

function getGulpPackageTask(transform, format, opts = {}) {
  return getGulpTask('seeds-<%= packageName %>', transform, format, opts);
}

gulp.task('clean', () => {
  return del(['dist/*']);
});

gulp.task('<%= packageName %>-scss', getGulpPackageTask('web', 'scss'));
gulp.task('<%= packageName %>-js', getGulpPackageTask('js', 'common.js'));

gulp.task('<%= packageName %>-docs', done => {
  theo.plugins.file(tokensPath).pipe(theo.plugins.transform('web')).pipe(
    theo.plugins.getResult(result => {
      const tokens = JSON.parse(result);
      const docsTokens = tokens.propKeys.map(key => {
        const prop = tokens.props[key];
        const {value, description, category} = prop;

        return {
          app: upperFirst(prop.name),
          sass: sassVar(prop.package, prop.name),
          javascript: javascriptConst(prop.package, prop.name),
          value,
          description,
          category
        };
      });

      fs.writeFileSync(
        'dist/tokens.json',
        JSON.stringify(docsTokens)
      );
      done();
    })
  );
});

gulp.task('default', gulp.series(['clean', gulp.parallel(['<%= packageName %>-scss', '<%= packageName %>-js']), '<%= packageName %>-docs']));
