const mround = require('mround');

const lineHeightBase = 1.5;
const gridSize = 8;

function getLineHeight(name, value) {
  const multiplier = parseInt(name, 10) / 100 - 3;

  // Get the proportional line height based on the multiplier and the grid size
  const proportionalLineHeight = ((1 - lineHeightBase) / gridSize) * multiplier + lineHeightBase;

  // Get the pixel height of three lines of text at the proportional line height,
  // snapped to the grid size
  const pixelHeightOfThreeLines = mround(proportionalLineHeight * value * 3, gridSize);

  return pixelHeightOfThreeLines / 3;
}

module.exports = getLineHeight;
