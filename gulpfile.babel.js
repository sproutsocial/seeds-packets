import fs from 'fs';
import { exec } from 'child_process';
import gulp from 'gulp';
import theo from 'theo';
import del from 'del';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import gulpUtil from 'gulp-util';
import open from 'gulp-open';
import child from 'child_process';
import pascalCase from 'pascal-case';
import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';
import upperFirst from 'lodash.upperfirst';
import tinycolor from 'tinycolor2';
import globby from 'globby';
import ase from 'ase-utils';

// Get all the package versions
let packages = globby.sync(['./package.json', './packages/**/package.json']);
let versions = {};
packages.forEach((packageJsonPath) => {
  const packageJson = require(packageJsonPath);
  versions[packageJson.name.replace('@sproutsocial/', '')] = packageJson.version;
});

// Naming things
const sassVar = (type, name) => {
  const nameArray = name.split(' ');
  const varName = `$${pascalCase(type)}-${camelCase(nameArray[0])}`;
  return nameArray[1] ? varName + `--${camelCase(nameArray[1])}` : varName;
}
const constantCase = (str) => snakeCase(str).toUpperCase();
const javascriptConst = (type, name) => constantCase(`${type} ${name}`);

const getPercentageRGB = (color) => {
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

theo.registerFormat('common.js', (json) => {
  const props = json.propKeys.map((key) => {
    const prop = json.props[key];
    return `${javascriptConst(prop.type, prop.name)}: '${prop.value}'`;
  }).join(',\n  ');

  return `var seedsColor = {\n  ${props}\n};\n\n module.exports = seedsColor;`;
});

theo.registerFormat('swift', (json) => {
  const props = json.propKeys.map((key) => {
    const prop = json.props[key];

    if (prop.type !== 'color') {
      return;
    }

    return `static func ${camelCase(prop.name)}() -> UIColor {\n    ${prop.value}\n  }`;
  }).join('\n  ');

  return `// seeds-color\n// version ${versions['seeds-color']}\n\nimport Foundation\n\nextension UIColor {\n  ${props}\n}`;
});

theo.registerFormat('android.xml', (json) => {
  const props = json.propKeys.map((key) => {
    const prop = json.props[key];
    const tag = prop.type === 'color' ? 'color' : 'property';
    return `<${tag} name="${constantCase(prop.name)}" category="${prop.category}">${prop.value}</${tag}>`;
  }).join('\n  ');

  return `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n  ${props}\n</resources>`;
});

theo.registerFormat('python.py', (json) => {
  const props = json.propKeys.map((key) => {
    const prop = json.props[key];
    return `${camelCase(prop.name)} = '${prop.value}'`;
  }).join('\n');

  return `# seeds-color\n# version ${versions['seeds-color']}\n\n${props}`;
});

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

theo.registerFormat('ase', (json) => {
  const props = json.propKeys.map((key) => {
    const prop = json.props[key];

    if (prop.type !== 'color') {
      return;
    }

    return {
      name: upperFirst(prop.name),
      model: 'RGB',
      type: 'global',
      color: [
        prop.value.red,
        prop.value.green,
        prop.value.blue
      ]
    };
  });

  // Theo requires a string, which is why we're stringifying it here then unstringifying it below
  return JSON.stringify({
    version: '1.0',
    // TODO: Try and make groups work…
    groups: [],
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
    const { r, g, b, a } = getPercentageRGB(prop.value);
    return `return UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: ${a})`;
  }
);

theo.registerValueTransform('color/app-palette',
  (prop) => prop.type === 'color',
  (prop) => {
    const { r, g, b, a } = getPercentageRGB(prop.value);
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

theo.registerTransform('designapp', [
  'color/app-palette'
]);

const colorTokensPath = 'packages/seeds-color/tokens.yml';

gulp.task('clean', () => del.sync(['packages/**/dist', 'docs/downloads/*']));

function getGulpColorTask(transform, format, opts = {}) {
  opts = {
    appendVersion: opts.appendVersion || false,
    dest: opts.dest || 'packages/seeds-color/dist',
    filename: opts.filename || 'seeds-color'
  };
  return function() {
    gulp.src(colorTokensPath)
      .pipe(theo.plugins.transform(transform))
      .pipe(theo.plugins.format(format))
      .pipe(rename({ basename: `${opts.filename}${opts.appendVersion ? '.' + versions['seeds-color'] : ''}` }))
      .pipe(gulp.dest(opts.dest));
  }
}

// TODO: Abstract the filename conventions
gulp.task('color-scss', getGulpColorTask('web', 'scss'));
gulp.task('color-js', getGulpColorTask('web', 'common.js'));
gulp.task('color-swift', getGulpColorTask('swift', 'swift', {
  filename: `UIColor+${pascalCase('seeds-color')}`,
  dest: 'docs/downloads'
}));
gulp.task('color-android', getGulpColorTask('android', 'android.xml', {
  filename: snakeCase('seeds-color'),
  dest: 'docs/downloads'
}));
gulp.task('color-python', getGulpColorTask('web', 'python.py', {
  filename: snakeCase('seeds-color'),
  dest: 'docs/downloads'
}));
gulp.task('color-sketch', getGulpColorTask('designapp', 'sketch.sketchpalette', {
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

gulp.task('color-clr', ['color-ase'], (cb) => {
  const downloadDir = `${__dirname}/docs/downloads`;
  exec(`${__dirname}/node_modules/ase-util/bin/ase2clr ${downloadDir}/seeds-color.${versions['seeds-color']}.ase ${downloadDir}/seeds-color.${versions['seeds-color']}.clr`, (err) => {
    cb(err);
  });
});

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
          palette: upperFirst(prop.name),
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
  'color-sketch',
  'color-ase',
  'color-clr'
]);

gulp.task('docs', () => {
  const versionsYaml = Object.keys(versions).map((pkg) => `${pkg}: ${versions[pkg]}`).join('\n');

  gulp.src('docs/_config.yml')
    .pipe(replace(/(# #versions)[^]+(# \/versions)/gm, '\$1\n' + versionsYaml + '\n\$2'))
    .pipe(gulp.dest('docs'));
});

gulp.task('build', [
  'clean',
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
