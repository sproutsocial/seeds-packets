import fs from 'fs';
import gulp from 'gulp';
import theo from 'theo';
import rename from 'gulp-rename';
import insert from 'gulp-insert';
import yaml from 'js-yaml';
import mround from 'mround';

import sassVar from '../util/sassvar';

const typographyTokensPath = 'packages/seeds-typography/tokens.yml';

const typographySassMixin = (pkg, name, fontSize, lineHeight) => `@mixin ${sassVar(pkg, name).replace('$', '')}($unit: px) {
  @include Typography-size--factory(${fontSize}, ${lineHeight}, $unit);
}`;

const typographySassMixinDependencies = `
// Default is for marketing dev, which uses rems
$Typography-size--base: $Typography-size--400 !default

@function px-to-rem($size) {
  $remSize: $size / $Typography-size--base;
  @return #{$remSize}rem;
}

@mixin Typography-size--factory($font-size, $line-height, $unit) {
  @if $unit == 'rem' {
    font-size: px-to-rem($font-size);
  }
  @else {
    font-size: $font-size;
  }
  line-height: $line-height;
}
`;

gulp.task('typography-scss', () =>
  gulp.src(typographyTokensPath)
    .pipe(theo.plugins.transform('web'))
    .pipe(theo.plugins.format('scss'))
    .pipe(insert.transform((contents) => {
      // Build out the mixins. This method may make sense more globally eventually.
      // Yes, we're reading the YAML file again, but figuring out how to cajole
      // Theo into combining values was hurting my brain.
      const tokens = yaml.safeLoad(fs.readFileSync(typographyTokensPath, 'utf8'));
      const pkg = tokens.global.package;
      const gridSize = parseInt(tokens.global.gridSize, 10);
      const lineHeightBase = tokens.global.lineHeightBase;
      const sizeTokens = Object.keys(tokens.props).filter((key) => key.indexOf('size') === 0);

      // Add line heights.
      // TODO: Explain the math (it was mostly trial and error to get to this point)
      sizeTokens.forEach((prop) => {
        const pixelFontSize = parseInt(tokens.props[prop].value, 10);
        const multiplier = (parseInt(prop.replace('size',''), 10) / 100) - 3;

        // Get the proportional line height based on the multiplier and the grid size
        const proportionalLineHeight = (((1 - lineHeightBase) / gridSize) * multiplier) + lineHeightBase;

        // Get the pixel height of three lines of text at the proportional line height,
        // snapped to the grid size
        const pixelHeightOfThreeLines = mround(((proportionalLineHeight * pixelFontSize) * 3), gridSize);

        const pixelHeightOfOneLine = pixelHeightOfThreeLines / 3;
        const onGridLineHeight = pixelHeightOfOneLine / pixelFontSize;
        tokens.props[prop].lineHeight = onGridLineHeight;
      });

      const mixins = sizeTokens.map((prop) =>
        typographySassMixin(
          pkg,
          prop,
          sassVar(pkg, prop),
          tokens.props[prop].lineHeight
        )
      ).join('\n');
      return [contents, typographySassMixinDependencies, mixins].join('\n');
    }))
    .pipe(rename({ basename: 'seeds-typography' }))
    .pipe(gulp.dest('packages/seeds-typography/dist'))
);

gulp.task('typography', [
  'typography-scss'
]);
