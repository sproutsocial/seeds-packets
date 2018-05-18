const fs = require('fs');
const del = require('del');
const exec = require('child_process').exec;
const gulp = require('gulp');
const theo = require('theo');
const pascalCase = require('pascal-case');
const camelCase = require('lodash.camelcase');
const snakeCase = require('lodash.snakecase');
const upperFirst = require('lodash.upperfirst');
const tinycolor = require('tinycolor2');
const ase = require('ase-utils');
const makeDir = require('make-dir');

const versions = require('@sproutsocial/seeds-utils/versions');
const cssPropertyName = require('@sproutsocial/seeds-utils/css-property-name');
const sassVar = require('@sproutsocial/seeds-utils/sassvar').sassVar;
const getGulpTask = require('@sproutsocial/seeds-utils/getgulptask');
const constantCase = require('@sproutsocial/seeds-utils/constantcase').constantCase;
const javascriptConst = require('@sproutsocial/seeds-utils/constantcase').javascriptConst;
const getPercentageRGB = require('@sproutsocial/seeds-utils/getpercentagergb');

const colorTokensPath = './tokens.yml';
require('@sproutsocial/seeds-utils/theo');

// TODO: Consider eliminating a lot of the duplication in this file

function getGulpColorTask(transform, format, opts = {}) {
  return getGulpTask('seeds-color', transform, format, opts);
}

gulp.task('clean', () => {
  return del(['dist/*']);
});

gulp.task('color-scss', getGulpColorTask('web', 'scss'));

gulp.task('color-css', getGulpColorTask('web', 'custom-properties.css'));

gulp.task('color-js', getGulpColorTask('js', 'common.js'));

gulp.task(
  'color-swift',
  getGulpColorTask('swift', 'swift', {
    filename: `UIColor+${pascalCase('seeds-color')}`,
    dest: 'dist',
    prependFile: `// seeds-color\n// version ${versions['seeds-color'].version}`
  })
);

gulp.task(
  'color-android',
  getGulpColorTask('android', 'android.xml', {
    filename: snakeCase('seeds-color'),
    dest: 'dist'
  })
);

gulp.task(
  'color-python',
  getGulpColorTask('web', 'python.py', {
    filename: snakeCase('seeds-color'),
    dest: 'dist',
    prependFile: `# seeds-color\n# version ${versions['seeds-color'].version}`
  })
);

gulp.task(
  'color-sketch',
  getGulpColorTask('sketch', 'sketch.sketchpalette', {
    appendVersion: false,
    dest: 'dist'
  })
);

gulp.task('color-ase', done => {
  return gulp
    .src(colorTokensPath)
    .pipe(theo.plugins.transform('designapp'))
    .pipe(theo.plugins.format('ase'))
    .pipe(
      theo.plugins.getResult(result => {
        fs.writeFileSync(`dist/seeds-color.ase`, ase.encode(JSON.parse(result)));
        done();
      })
    );
});

gulp.task('color-clr', done => {
  const downloadDir = `${process.cwd()}/dist`;
  exec(
    `${process.cwd()}/node_modules/ase-util/bin/ase2clr ${downloadDir}/seeds-color.${versions['seeds-color']
      .version}.ase ${downloadDir}/seeds-color.clr`,
    err => {
      done(err);
    }
  );
});

gulp.task('color-docs', done => {
  theo.plugins
    .file(colorTokensPath)
    .pipe(theo.plugins.transform('web'))
    .pipe(
      theo.plugins.getResult(result => {
        const tokens = JSON.parse(result);
        const colors = tokens.propKeys.map(key => {
          const prop = tokens.props[key];
          const {category, value} = prop;

          return {
            category,
            deprecated: !!prop.deprecated,
            value: {
              hex: value,
              rgb: tinycolor(value).toRgbString()
            },
            app: upperFirst(prop.name),
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
      'color-css',
      'color-scss',
      'color-js',
      'color-swift',
      'color-android',
      'color-python',
      'color-sketch',
      gulp.series(['color-ase', 'color-clr'])
    ]),
    'color-docs'
  ])
);
