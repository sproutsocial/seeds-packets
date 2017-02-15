import fs from 'fs';
import gulp from 'gulp';
import theo from 'theo';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import gulpUtil from 'gulp-util';
import open from 'gulp-open';
import child from 'child_process';
import pascalCase from 'pascal-case';
import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';
import tinycolor from 'tinycolor2';
import globby from 'globby';

const sassVar = (type, name) => {
  const nameArray = name.split(' ');
  const varName = `$${pascalCase(type)}-${camelCase(nameArray[0])}`;
  return nameArray[1] ? varName + `--${camelCase(nameArray[1])}` : varName;
}
const constantCase = (str) => snakeCase(str).toUpperCase();
const javascriptConst = (type, name) => constantCase(`${type} ${name}`);

const getCocoaRGB = (color) => {
  const percentageRgb = tinycolor(color).toRgb();
  Object.keys(percentageRgb).forEach((value) => {
    const val = value !== 'a' ? percentageRgb[value] / 255 : percentageRgb[value];
    percentageRgb[value] = val;
  });
  return percentageRgb;
};

theo.registerFormat('scss', (json) =>
  json.propKeys.map((key) => {
    const prop = json.props[key];
    return `${sassVar(prop.type, prop.name)}: ${prop.value};`;
  }).join('\n')
);

theo.registerFormat('es2015.js', (json) => 
  json.propKeys.map((key) => {
    const prop = json.props[key];
    return `export const ${javascriptConst(prop.type, prop.name)} = '${prop.value}';`;
  }).join('\n')
);

theo.registerFormat('swift', (json) => {
  const props = json.propKeys.map((key) => {
    const prop = json.props[key];

    if (prop.type !== 'color') {
      return;
    }

    return `static func ${camelCase(prop.name)}() -> UIColor {\n    ${prop.value}\n  }`;
  }).join('\n  ');

  return `import Foundation\n\nextension UIColor {\n  ${props}\n}`;
});

theo.registerFormat('android.xml', (json) => {
  const props = json.propKeys.map((key) => {
    const prop = json.props[key];
    const tag = prop.type === 'color' ? 'color' : 'property';
    return `<${tag} name="${constantCase(prop.name)}" category="${prop.category}">${prop.value}</${tag}>`;
  }).join('\n  ');

  return `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n  ${props}\n</resources>`;
});

theo.registerFormat('python.py', (json) => 
  json.propKeys.map((key) => {
    const prop = json.props[key];
    return `${camelCase(prop.name)} = '${prop.value}'`;
  }).join('\n')
);

theo.registerFormat('sketch.sketchpalette', (json) => {
  const props = json.propKeys.map((key) => {
    const prop = json.props[key];

    if (prop.type !== 'color') {
      return;
    }

    return prop.value;
  });

  return JSON.stringify({
    compatibleVersion: 1.5,
    pluginVersion: 1.5,
    colors: props
  });
});

theo.registerValueTransform('color/hex/short',
  (prop) => prop.type === 'color',
  (prop) => prop.value.replace(/^#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3$/, '#\$1\$2\$3')
);

theo.registerValueTransform('color/swift',
  (prop) => prop.type === 'color',
  (prop) => {
    const { r, g, b, a } = getCocoaRGB(prop.value);
    return `return UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: ${a})`;
  }
);

theo.registerValueTransform('color/sketch',
  (prop) => prop.type === 'color',
  (prop) => {
    const { r, g, b, a } = getCocoaRGB(prop.value);
    return {
      red: r,
      green: g,
      blue: b,
      alpha: a
    };
  }
);

theo.registerTransform('web', [
  'color/hex/short'
]);

theo.registerTransform('swift', [
  'color/swift'
]);

theo.registerTransform('sketch', [
  'color/sketch'
]);

const colorTokensPath = 'packages/seeds-color/tokens.yml';

function getGulpColorTask(transform, format, dest = 'packages/seeds-color/dist') {
  return function() {
    gulp.src(colorTokensPath)
      .pipe(theo.plugins.transform(transform))
      .pipe(theo.plugins.format(format))
      .pipe(rename({ basename: 'seeds-color' }))
      .pipe(gulp.dest(dest));
  }
}

gulp.task('color-scss', getGulpColorTask('web', 'scss'));
gulp.task('color-js', getGulpColorTask('web', 'es2015.js'));
gulp.task('color-swift', getGulpColorTask('swift', 'swift'));
gulp.task('color-android', getGulpColorTask('android', 'android.xml'));
gulp.task('color-python', getGulpColorTask('web', 'python.py'));
gulp.task('color-sketch', getGulpColorTask('sketch', 'sketch.sketchpalette', 'docs/downloads'));

gulp.task('color-docs', () => {
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
          palette: prop.name.charAt(0).toUpperCase() + prop.name.slice(1),
          sass: sassVar(prop.type, prop.name),
          javascript: javascriptConst(prop.type, prop.name),
          swift: `UIColor().${camelCase(prop.name)}()`,
          android: constantCase(prop.name),
          python: camelCase(prop.name),
          rgb: tinycolor(value).toRgbString(value)
        }
      });
      
      fs.writeFileSync('docs/_includes/colors.html', `<!-- GENERATED BY GULP - DO NOT EDIT -->\n\n<script>window.seedsColors = ${JSON.stringify(colors)};</script>`);
    }));
});

gulp.task('color', [
  'color-scss',
  'color-js',
  'color-swift',
  'color-android',
  'color-python',
  'color-docs',
  'color-sketch'
]);

gulp.task('docs', () => {
  let packages = globby.sync(['./package.json', './packages/**/package.json']);
  const versions = packages.map((packageJsonPath) => {
    const packageJson = require(packageJsonPath);
    return `${packageJson.name}: ${packageJson.version}`;
  }).join('\n');

  gulp.src('docs/_config.yml')
    .pipe(replace(/(# #versions)[^]+(# \/versions)/gm, '\$1\n' + versions + '\n\$2'))
    .pipe(gulp.dest('docs'));
});

gulp.task('build', [
  'color',
  'docs'
]);

gulp.task('serve', ['build'], () => {
  const jekyll = child.spawn('jekyll', ['serve', '--watch'], { cwd: './docs' });
  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gulpUtil.log('Jekyll: ' + message));
  };
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
  setTimeout(() => {
    gulp.src('')
      .pipe(open({
        uri: 'http://localhost:4000/seeds/'
      }));
  }, 4000);
});

gulp.task('default', [
  'build'
]);
