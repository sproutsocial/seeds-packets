const fs = require('fs');
const gulp = require('gulp');
const theo = require('theo');
const sassVar = require('@sproutsocial/seeds-utils/sassvar').sassVar;
const getGulpTask = require('@sproutsocial/seeds-utils/getgulptask');
const javascriptConst = require('@sproutsocial/seeds-utils/constantcase').javascriptConst;
const makeDir = require('make-dir');

const spaceTokensPath = './tokens.yml';
require('@sproutsocial/seeds-utils/theo');

function getGulpSpaceTask(transform, format, opts = {}) {
  return getGulpTask('seeds-space', transform, format, opts);
}

gulp.task('space-scss', getGulpSpaceTask('web', 'scss'));
gulp.task('space-js', getGulpSpaceTask('js', 'common.js'));

gulp.task('space-docs', done => {
  theo.plugins.file(spaceTokensPath).pipe(theo.plugins.transform('web')).pipe(
    theo.plugins.getResult(result => {
      const tokens = JSON.parse(result);
      const size = tokens.propKeys.map(key => {
        const prop = tokens.props[key];
        const {value, description} = prop;

        return {
          sass: sassVar(prop.package, prop.name),
          javascript: javascriptConst(prop.package, prop.name),
          value,
          description
        };
      });

      fs.writeFileSync(
        'dist/tokens.json',
        `${JSON.stringify(size)}`
      );
      done();
    })
  );
});

gulp.task('default', gulp.series([gulp.parallel(['space-scss', 'space-js']), 'space-docs']));
