const mround = require('mround');

function getLineHeight(prop) {
  const {gridSize, lineHeightBase, value, name} = prop;

  const multiplier = parseInt(name.replace('size', ''), 10) / 100 - 3;

  // Get the proportional line height based on the multiplier and the grid size
  const proportionalLineHeight = (1 - lineHeightBase) / gridSize * multiplier + lineHeightBase;

  // Get the pixel height of three lines of text at the proportional line height,
  // snapped to the grid size
  const pixelHeightOfThreeLines = mround(proportionalLineHeight * value * 3, gridSize);

  return pixelHeightOfThreeLines / 3;
}

module.exports = getLineHeight;
