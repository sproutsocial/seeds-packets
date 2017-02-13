import gulp from 'gulp';
import theo from 'theo';
import rename from 'gulp-rename';
import pascalCase from 'pascal-case';
import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';
import tinycolor from 'tinycolor2';

const constantCase = (str) => snakeCase(str).toUpperCase();

theo.registerFormat('scss', (json) =>
  json.propKeys.map((key) => {
    const prop = json.props[key];
    const propNameArray = prop.name.split(' ');

    // TODO: Document the prop naming format for Theo SEEDS-24
    let varName = `$${pascalCase(prop.type)}-${camelCase(propNameArray[0])}`;
    varName = propNameArray[1] ? varName + `--${camelCase(propNameArray[1])}` : varName;

    return `${varName}: ${prop.value};`;
  }).join('\n')
);

theo.registerFormat('es2015.js', (json) => 
  json.propKeys.map((key) => {
    const prop = json.props[key];
    let constName = constantCase(`${prop.type} ${prop.name}`);
    return `export const ${constName} = '${prop.value}';`;
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

theo.registerValueTransform('color/hex/short',
  (prop) => prop.type === 'color',
  (prop) => prop.value.replace(/^#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3$/, '#\$1\$2\$3')
);

theo.registerValueTransform('color/swift',
  (prop) => prop.type === 'color',
  (prop) => {
    const percentageRgb = tinycolor(prop.value).toRgb();

    Object.keys(percentageRgb).forEach((value) => {
      const val = value !== 'a' ? percentageRgb[value] / 255 : percentageRgb[value];
      percentageRgb[value] = val;
    });

    const { r, g, b, a } = percentageRgb;
    return `return UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: ${a})`;
  }
);

theo.registerTransform('web', [
  'color/hex/short'
]);

theo.registerTransform('swift', [
  'color/swift'
]);

function getGulpColorTask(transform, format) {
  return function() {
    gulp.src('packages/seeds-color/props.yml')
      .pipe(theo.plugins.transform(transform))
      .pipe(theo.plugins.format(format))
      .pipe(rename({ basename: 'seeds-color' }))
      .pipe(gulp.dest('packages/seeds-color/dist'));
  }
}

gulp.task('color-scss', getGulpColorTask('web', 'scss'));
gulp.task('color-js', getGulpColorTask('web', 'es2015.js'));
gulp.task('color-swift', getGulpColorTask('swift', 'swift'));
gulp.task('color-android', getGulpColorTask('android', 'android.xml'));
gulp.task('color-python', getGulpColorTask('web', 'python.py'));

gulp.task('color', [
  'color-scss',
  'color-js',
  'color-swift',
  'color-android',
  'color-python'
]);

gulp.task('default', [
  'color'
]);
