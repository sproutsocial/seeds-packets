import theo from 'theo';

import getPercentageRGB from '../../util/getpercentagergb';

theo.registerValueTransform('color/swift',
  (prop) => prop.type === 'color',
  (prop) => {
    const { r, g, b, a } = getPercentageRGB(prop.value);
    return `return UIColor(red: ${r}, green: ${g}, blue: ${b}, alpha: ${a})`;
  }
);

theo.registerTransform('swift', [
  'color/swift'
]);
