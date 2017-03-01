import theo from 'theo';
import getPercentageRGB from '../../util/getpercentagergb';

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

theo.registerTransform('designapp', [
  'color/app-palette'
]);