import gulp from 'gulp';
import theo from 'theo';
import rename from 'gulp-rename';
import pascalCase from 'pascal-case';
import camelCase from 'lodash.camelcase';
import snakeCase from 'lodash.snakecase';

theo.registerFormat('scss', (json, options) =>
  json.propKeys.map((key) => {
    const prop = json.props[key];
    const propNameArray = prop.name.split(' ');

    // TODO: Document the prop naming format for Theo SEEDS-24
    let varName = `$${pascalCase(prop.type)}-${camelCase(propNameArray[0])}`;
    varName = propNameArray[1] ? varName + `--${camelCase(propNameArray[1])}` : varName;

    return `${varName}: ${prop.value};`;
  }).join('\n')
);

theo.registerFormat('es2015.js', (json, options) => 
  json.propKeys.map((key) => {
    const prop = json.props[key];
    let constName = snakeCase(`${prop.type} ${prop.name}`).toUpperCase();
    return `export const ${constName} = '${prop.value}';`;
  }).join('\n')
);

// use three-digit hex value when possible
theo.registerValueTransform('color/hex/short',
  (prop, meta) => prop.type === 'color',
  (prop, meta) => prop.value.replace(/^#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3$/, '#\$1\$2\$3')
);

theo.registerTransform('web', [
  'color/hex/short'
]);

gulp.task('color-scss', () =>
  gulp.src('packages/seeds-color/props.yml')
    .pipe(theo.plugins.transform('web'))
    .pipe(theo.plugins.format('scss'))
    .pipe(rename({ basename: 'seeds-color' }))
    .pipe(gulp.dest('packages/seeds-color/dist'))
);

gulp.task('color-js', () =>
  gulp.src('packages/seeds-color/props.yml')
    .pipe(theo.plugins.transform('web'))
    .pipe(theo.plugins.format('es2015.js'))
    .pipe(rename({ basename: 'seeds-color' }))
    .pipe(gulp.dest('packages/seeds-color/dist'))
);

gulp.task('color', [
  'color-scss',
  'color-js'
]);

gulp.task('default', [
  'color'
]);
