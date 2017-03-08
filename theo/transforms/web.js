import theo from 'theo';
import mround from 'mround';

function getLineHeight(prop) {
  const {
    gridSize,
    lineHeightBase,
    value,
    name
  } = prop;

  const multiplier = (parseInt(name.replace('size', ''), 10) / 100) - 3;

  // Get the proportional line height based on the multiplier and the grid size
  const proportionalLineHeight = (((1 - lineHeightBase) / gridSize) * multiplier) + lineHeightBase;

  // Get the pixel height of three lines of text at the proportional line height,
  // snapped to the grid size
  const pixelHeightOfThreeLines = mround(((proportionalLineHeight * value) * 3), gridSize);

  return pixelHeightOfThreeLines / 3;
}

theo.registerValueTransform('color/hex/short',
  (prop) => prop.type === 'color',
  (prop) => prop.value.replace(/^#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3$/, '#\$1\$2\$3')
);

theo.registerValueTransform('font/scss',
  (prop) => prop.type === 'font size',
  (prop) => {
    return {
      variable: `${prop.value}px`,
      mixin: {
        'font-size': `Typography-getunit(${prop.value}px)`,
        'line-height': getLineHeight(prop) / prop.value
      }
    }
  }
);

theo.registerValueTransform('font/js',
  (prop) => prop.type === 'font size',
  (prop) => {
    return {
      fontSize: `${prop.value}px`,
      lineHeight: `${getLineHeight(prop)}px`
    };
  }
);

theo.registerTransform('web', [
  'color/hex/short',
  'font/scss'
]);

theo.registerTransform('js', [
  'color/hex/short',
  'font/js'
]);
