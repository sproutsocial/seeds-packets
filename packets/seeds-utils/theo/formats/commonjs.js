const theo = require('theo');

const javascriptConst = require('../../constantcase').javascriptConst;

function getValue(val) {
  switch (typeof val) {
    case 'object':
      const rules = Object.keys(val)
        .map(key => `${key}: ${getValue(val[key])}`)
        .join(',\n    ');
      return `{\n    ${rules}\n  }`;
    case 'string':
      return `'${val}'`;
    default:
      return val;
  }
}

theo.registerFormat('common.js', json => {
  const props = json.propKeys
    .map(key => {
      const prop = json.props[key];
      return `${javascriptConst(prop.package, prop.name)}: ${getValue(prop.value)}`;
    })
    .join(',\n  ');

  return `'use strict';\n\nmodule.exports = {\n  ${props}\n};`;
});
