const theo = require('theo');
const getLineHeight = require('../../getlineheight');

theo.registerValueTransform(
  'color/hex/short',
  prop => prop.type === 'color',
  prop => prop.value.replace(/^#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3$/, '#$1$2$3')
);

theo.registerValueTransform(
  'font/scss',
  prop => prop.type === 'font size',
  prop => {
    return {
      value: `${prop.value}px`,
      // Rules for SCSS mixins
      rules: {
        'font-size': `Typography-getunit(${prop.value}px)`,
        'line-height': getLineHeight(prop) / prop.value
      },
      // Properties for CSS properties
      properties: {
        rem: `${prop.value / parseInt(prop.fontSizeBase)}rem`,
        'line-height': getLineHeight(prop) / prop.value
      }
    };
  }
);

theo.registerValueTransform(
  'space/css',
  prop => prop.package === 'space' && prop.category === 'size',
  prop => {
    return {
      value: prop.value,
      // Properties for CSS properties
      properties: {
        rem: `${parseInt(prop.value) / parseInt(prop.fontSizeBase)}rem`
      }
    };
  }
);

theo.registerValueTransform(
  'font/js',
  prop => prop.type === 'font size',
  prop => {
    return {
      fontSize: `${prop.value}px`,
      lineHeight: `${getLineHeight(prop)}px`
    };
  }
);

theo.registerTransform('web', ['color/hex/short', 'font/scss', 'space/css']);

theo.registerTransform('js', ['color/hex/short', 'font/js']);
