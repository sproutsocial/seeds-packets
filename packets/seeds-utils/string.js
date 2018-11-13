const snakeCase = require('lodash.snakecase');
const kebabCase = require('lodash.kebabcase');
const pascalCase = require('pascal-case');
const camelCase = require('lodash.camelcase');

const constantCase = str => snakeCase(str).toUpperCase();

const javascriptConst = (type, name) => constantCase(`${type} ${name}`);

const cssPropertyName = (type, name, property) => {
  const baseName = `--${kebabCase(type)}-${kebabCase(name)}`;
  if (property) return `${baseName}-${kebabCase(property)}`;
  return baseName;
};

function suitCssName(type, name) {
  const nameArray = name.split(' ');
  const varName = `${pascalCase(type)}-${camelCase(nameArray[0])}`;
  return nameArray[1] ? varName + `--${camelCase(nameArray[1])}` : varName;
}

const sassVar = (type, name) => '$' + suitCssName(type, name);

module.exports = {
  constantCase,
  javascriptConst,
  cssPropertyName,
  sassVar,
  suitCssName
};
