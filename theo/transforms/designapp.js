import theo from 'theo';
import getPercentageRGB from '../../util/getpercentagergb';
import upperFirst from 'lodash.upperfirst';
import getLineHeight from '../../util/getlineheight';

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

theo.registerValueTransform('font/sketch',
  (prop) => prop.type === 'font size',
  (prop) => {
    return {
      name: upperFirst(prop.name),
      font: prop.appFontFamily,
      size: prop.value,
      color: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
      },
      alignment: 0,
      spacing: 0,
      lineHeight: getLineHeight(prop)
    }
  }
);

theo.registerTransform('sketch', [
  'color/app-palette',
  'font/sketch'
]);

theo.registerTransform('designapp', [
  'color/app-palette'
]);
