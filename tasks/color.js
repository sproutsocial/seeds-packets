import fs from 'fs';
import { exec } from 'child_process';
import gulp from 'gulp';
import theo from 'theo';
import pascalCase from 'pascal-case';
import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';
import upperFirst from 'lodash.upperfirst';
import tinycolor from 'tinycolor2';
import ase from 'ase-utils';

import versions from '../util/versions';
import sassVar from '../util/sassvar';
import getGulpTask from '../util/getgulptask';
import { constantCase, javascriptConst } from '../util/constantcase';
import getPercentageRGB from '../util/getpercentagergb';

const colorTokensPath = 'packages/seeds-color/tokens.yml';
const networkColorTokensPath = 'packages/seeds-networkcolor/tokens.yml';

// TODO: Consider eliminating a lot of the duplication in this file

function getGulpColorTask(transform, format, opts = {}) {
  return getGulpTask('seeds-color', transform, format, opts);
}
function getGulpNetworkColorTask(transform, format, opts = {}) {
  return getGulpTask('seeds-networkcolor', transform, format, opts);
}

gulp.task('color-scss', getGulpColorTask('web', 'scss'));
gulp.task('networkcolor-scss', getGulpNetworkColorTask('web', 'scss'));

gulp.task('color-js', getGulpColorTask('js', 'common.js'));
gulp.task('networkcolor-js', getGulpNetworkColorTask('js', 'common.js'));

gulp.task('color-swift', getGulpColorTask('swift', 'swift', {
  filename: `UIColor+${pascalCase('seeds-color')}`,
  dest: 'docs/downloads',
  prependFile: `// seeds-color\n// version ${versions['seeds-color']}`
}));
gulp.task('networkcolor-swift', getGulpNetworkColorTask('swift', 'swift', {
  filename: `UIColor+${pascalCase('seeds-networkcolor')}`,
  dest: 'docs/downloads',
  prependFile: `// seeds-networkcolor\n// version ${versions['seeds-networkcolor']}`
}));

gulp.task('color-android', getGulpColorTask('android', 'android.xml', {
  filename: snakeCase('seeds-color'),
  dest: 'docs/downloads'
}));
gulp.task('networkcolor-android', getGulpNetworkColorTask('android', 'android.xml', {
  filename: snakeCase('seeds-networkcolor'),
  dest: 'docs/downloads'
}));

gulp.task('color-python', getGulpColorTask('web', 'python.py', {
  filename: snakeCase('seeds-color'),
  dest: 'docs/downloads',
  prependFile: `# seeds-color\n# version ${versions['seeds-color']}`
}));
gulp.task('networkcolor-python', getGulpNetworkColorTask('web', 'python.py', {
  filename: snakeCase('seeds-networkcolor'),
  dest: 'docs/downloads',
  prependFile: `# seeds-networkcolor\n# version ${versions['seeds-networkcolor']}`
}));

gulp.task('color-sketch', getGulpColorTask('sketch', 'sketch.sketchpalette', {
  appendVersion: true,
  dest: 'docs/downloads'
}));
gulp.task('networkcolor-sketch', getGulpNetworkColorTask('sketch', 'sketch.sketchpalette', {
  appendVersion: true,
  dest: 'docs/downloads'
}));

gulp.task('color-ase', () => {
  return gulp.src(colorTokensPath)
    .pipe(theo.plugins.transform('designapp'))
    .pipe(theo.plugins.format('ase'))
    .pipe(theo.plugins.getResult((result) => {
      const wstream = fs.createWriteStream(`docs/downloads/seeds-color.${versions['seeds-color']}.ase`);
      wstream.write(ase.encode(JSON.parse(result)));
      wstream.end();
    }));
});
gulp.task('networkcolor-ase', () => {
  return gulp.src(networkColorTokensPath)
    .pipe(theo.plugins.transform('designapp'))
    .pipe(theo.plugins.format('ase'))
    .pipe(theo.plugins.getResult((result) => {
      const wstream = fs.createWriteStream(`docs/downloads/seeds-networkcolor.${versions['seeds-networkcolor']}.ase`);
      wstream.write(ase.encode(JSON.parse(result)));
      wstream.end();
    }));
});

gulp.task('color-clr', ['color-ase'], (cb) => {
  const downloadDir = `${process.cwd()}/docs/downloads`;
  exec(`${process.cwd()}/node_modules/ase-util/bin/ase2clr ${downloadDir}/seeds-color.${versions['seeds-color']}.ase ${downloadDir}/seeds-color.${versions['seeds-color']}.clr`, (err) => {
    cb(err);
  });
});
gulp.task('networkcolor-clr', ['networkcolor-ase'], (cb) => {
  const downloadDir = `${process.cwd()}/docs/downloads`;
  exec(`${process.cwd()}/node_modules/ase-util/bin/ase2clr ${downloadDir}/seeds-networkcolor.${versions['seeds-networkcolor']}.ase ${downloadDir}/seeds-networkcolor.${versions['seeds-networkcolor']}.clr`, (err) => {
    cb(err);
  });
});

gulp.task('color-docs', ['docs'], () => {
  theo.plugins
    .file(colorTokensPath)
    .pipe(theo.plugins.transform('web'))
    .pipe(theo.plugins.getResult((result) => {
      const tokens = JSON.parse(result);
      const colors = tokens.propKeys.map((key) => {
        const prop = tokens.props[key];
        const { category, value } = prop;

        return {
          category,
          value,
          palette: upperFirst(prop.name),
          sass: sassVar(prop.package, prop.name),
          javascript: javascriptConst(prop.package, prop.name),
          swift: `UIColor().${camelCase(prop.name)}()`,
          android: constantCase(prop.name),
          python: camelCase(prop.name),
          rgb: tinycolor(value).toRgbString(value)
        }
      });
      
      fs.writeFileSync('docs/_includes/colors.html', `<!-- GENERATED BY GULP - DO NOT EDIT -->\n\n<script>window.seedsColors = ${JSON.stringify(colors)};</script>`);
    }));
});
gulp.task('networkcolor-docs', ['docs'], () => {
  theo.plugins
    .file(networkColorTokensPath)
    .pipe(theo.plugins.transform('web'))
    .pipe(theo.plugins.getResult((result) => {
      const tokens = JSON.parse(result);
      const colors = tokens.propKeys.map((key) => {
        const prop = tokens.props[key];
        const { category, value } = prop;

        return {
          category,
          value,
          palette: upperFirst(prop.name),
          sass: sassVar(prop.package, prop.name),
          javascript: javascriptConst(prop.package, prop.name),
          swift: `UIColor().${camelCase(prop.name)}()`,
          android: constantCase(prop.name),
          python: camelCase(prop.name),
          rgb: tinycolor(value).toRgbString(value)
        }
      });

      fs.writeFileSync('docs/_includes/networkcolors.html', `<!-- GENERATED BY GULP - DO NOT EDIT -->\n\n<script>window.seedsColors = ${JSON.stringify(colors)};</script>`);
    }));
});

gulp.task('color', [
  'color-scss',
  'color-js',
  'color-swift',
  'color-android',
  'color-python',
  'color-sketch',
  'color-ase',
  'color-clr',
  'color-docs'
]);

gulp.task('networkcolor', [
  'networkcolor-scss',
  'networkcolor-js',
  'networkcolor-swift',
  'networkcolor-android',
  'networkcolor-python',
  'networkcolor-sketch',
  'networkcolor-ase',
  'networkcolor-clr',
  'networkcolor-docs'
]);
