const pascalCase = require('pascal-case');
const camelCase = require('lodash.camelcase');

function suitCssName(type, name) {
  const nameArray = name.split(' ');
  const varName = `${pascalCase(type)}-${camelCase(nameArray[0])}`;
  return nameArray[1] ? varName + `--${camelCase(nameArray[1])}` : varName;
}

const sassVar = (type, name) => '$' + suitCssName(type, name);

module.exports = {
  sassVar,
  suitCssName
};
