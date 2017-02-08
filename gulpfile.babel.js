import gulp from 'gulp';
import theo from 'theo';
import rename from 'gulp-rename';
import cleanDest from 'gulp-clean-dest';
import pascalCase from 'pascal-case';
import camelCase from 'lodash.camelcase';

theo.registerFormat('scss', (json, options) =>
  json.propKeys.map((key) => {
    const prop = json.props[key];
    const propNameArray = prop.name.split(' ');

    // TODO: Document the prop naming format for Theo
    let varName = `$${pascalCase(prop.type)}-${camelCase(propNameArray[0])}`;
    varName = propNameArray[1] ? varName + `--${camelCase(propNameArray[1])}` : varName;

    return `${varName}: ${prop.value};`;
  }).join('\n')
);

gulp.task('color', () =>
  gulp.src('packages/seeds-color/props.yml')
    .pipe(cleanDest('packages/seeds-color/dist'))
    .pipe(theo.plugins.transform('web'))
    .pipe(theo.plugins.format('scss'))
    .pipe(rename({ basename: 'seeds-color' }))
    .pipe(gulp.dest('packages/seeds-color/dist'))
);
