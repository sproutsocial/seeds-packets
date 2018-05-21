const fs = require('fs');
const del = require('del');
const exec = require('child_process').exec;
const gulp = require('gulp');
const theo = require('theo');
const pascalCase = require('pascal-case');
const camelCase = require('lodash.camelcase');
const snakeCase = require('lodash.snakecase');
const upperFirst = require('lodash.upperfirst');
const cssPropertyName = require('@sproutsocial/seeds-utils/css-property-name');
const tinycolor = require('tinycolor2');
const ase = require('ase-utils');
const makeDir = require('make-dir');

const versions = require('@sproutsocial/seeds-utils/versions');
const sassVar = require('@sproutsocial/seeds-utils/sassvar').sassVar;
const getGulpTask = require('@sproutsocial/seeds-utils/getgulptask');
const constantCase = require('@sproutsocial/seeds-utils/constantcase').constantCase;
const javascriptConst = require('@sproutsocial/seeds-utils/constantcase').javascriptConst;
const getPercentageRGB = require('@sproutsocial/seeds-utils/getpercentagergb');

const networkColorTokensPath = './tokens.yml';
require('@sproutsocial/seeds-utils/theo');

// TODO: Consider eliminating a lot of the duplication in this file

function getGulpNetworkColorTask(transform, format, opts = {}) {
  return getGulpTask('seeds-networkcolor', transform, format, opts);
}

gulp.task('clean', () => {
  return del(['dist/*']);
});

gulp.task('networkcolor-scss', getGulpNetworkColorTask('web', 'scss'));

gulp.task('networkcolor-css', getGulpNetworkColorTask('web', 'custom-properties.css'));

gulp.task('networkcolor-js', getGulpNetworkColorTask('js', 'common.js'));

gulp.task(
  'networkcolor-swift',
  getGulpNetworkColorTask('swift', 'swift', {
    filename: `UIColor+${pascalCase('seeds-networkcolor')}`,
    dest: 'dist',
    prependFile: `// seeds-networkcolor\n// version ${versions['seeds-networkcolor'].version}`
  })
);

gulp.task(
  'networkcolor-android',
  getGulpNetworkColorTask('android', 'android.xml', {
    filename: snakeCase('seeds-networkcolor'),
    dest: 'dist'
  })
);

gulp.task(
  'networkcolor-python',
  getGulpNetworkColorTask('web', 'python.py', {
    filename: snakeCase('seeds-networkcolor'),
    dest: 'dist',
    prependFile: `# seeds-networkcolor\n# version ${versions['seeds-networkcolor'].version}`
  })
);

gulp.task(
  'networkcolor-sketch',
  getGulpNetworkColorTask('sketch', 'sketch.sketchpalette', {
    appendVersion: false,
    dest: 'dist'
  })
);

gulp.task('networkcolor-ase', done => {
  return gulp
    .src(networkColorTokensPath)
    .pipe(theo.plugins.transform('designapp'))
    .pipe(theo.plugins.format('ase'))
    .pipe(
      theo.plugins.getResult(result => {
        const wstream = fs.createWriteStream(`dist/seeds-networkcolor.ase`);
        wstream.write(ase.encode(JSON.parse(result)));
        wstream.end();
        done();
      })
    );
});

gulp.task(
  'networkcolor-clr',
  gulp.series([
    'networkcolor-ase',
    cb => {
      const downloadDir = `${process.cwd()}/dist`;
      exec(
        `${process.cwd()}/node_modules/ase-util/bin/ase2clr ${downloadDir}/seeds-networkcolor.ase ${downloadDir}/seeds-networkcolor.clr`,
        err => {
          cb(err);
        }
      );
    }
  ])
);

gulp.task('networkcolor-docs', done => {
  theo.plugins
    .file(networkColorTokensPath)
    .pipe(theo.plugins.transform('web'))
    .pipe(
      theo.plugins.getResult(result => {
        const tokens = JSON.parse(result);
        const colors = tokens.propKeys.map(key => {
          const prop = tokens.props[key];
          const {category, deprecated, value} = prop;

          return {
            category,
            deprecated: !!prop.deprecated,
            value: {
              hex: value,
              rgb: tinycolor(value).toRgbString()
            },
            palette: upperFirst(prop.name),
            sass: sassVar(prop.package, prop.name),
            javascript: javascriptConst(prop.package, prop.name),
            css: cssPropertyName(prop.package, prop.name),
            swift: `UIColor().${camelCase(prop.name)}()`,
            android: constantCase(prop.name),
            python: camelCase(prop.name)
          };
        });

        fs.writeFileSync('dist/tokens.json', `${JSON.stringify(colors)}`);
        done();
      })
    );
});

gulp.task(
  'default',
  gulp.series([
    'clean',
    gulp.parallel([
      'networkcolor-css',
      'networkcolor-scss',
      'networkcolor-js',
      'networkcolor-swift',
      'networkcolor-android',
      'networkcolor-python',
      'networkcolor-sketch',
      'networkcolor-clr'
    ]),
    'networkcolor-docs'
  ])
);
