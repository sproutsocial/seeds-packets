import theo from 'theo';
import getLineHeight from '../../util/getlineheight';

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