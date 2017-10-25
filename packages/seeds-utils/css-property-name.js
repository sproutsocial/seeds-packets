const kebabCase = require('lodash.kebabcase');

const cssPropertyName = (type, name, property) => {
  const baseName = `--${kebabCase(type)}-${kebabCase(name)}`;
  if (property) return `${baseName}-${kebabCase(property)}`;
  return baseName;
};

module.exports = cssPropertyName;
