const tinycolor = require('tinycolor2');

function getPercentageRGB(color) {
  const percentageRgb = tinycolor(color).toRgb();
  Object.keys(percentageRgb).forEach(value => {
    const val = value !== 'a' ? percentageRgb[value] / 255 : percentageRgb[value];
    percentageRgb[value] = val;
  });
  return percentageRgb;
}

module.exports = getPercentageRGB;
