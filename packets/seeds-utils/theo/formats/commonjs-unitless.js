const theo = require('theo');

const javascriptConst = require('../../constantcase').javascriptConst;

function hasNumber(string) {
  return /\d/.test(string);
}

function getValue(val) {
  switch (typeof val) {
    case 'object':
      const rules = Object.keys(val)
        .map(key => `${key}: ${getValue(val[key])}`)
        .join(',\n    ');
      return `{\n    ${rules}\n  }`;
    case 'string':
      // Remove the `px` units from the value if it's a number
      if (hasNumber(val)) {
        return `${val.slice(0, -2)}`;
      } else {
        return `'${val}'`;
      }
    default:
      return val;
  }
}

theo.registerFormat('common-unitless.js', json => {
  const props = json.propKeys
    .map(key => {
      const prop = json.props[key];
      return `${javascriptConst(prop.package, prop.name)}: ${getValue(prop.value)}`;
    })
    .join(',\n  ');

  return `'use strict';\n\nmodule.exports = {\n  ${props}\n};`;
});
