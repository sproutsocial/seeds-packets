import theo from 'theo';

import { javascriptConst } from '../../util/constantcase';

function getValue(val) {
  switch (typeof val) {
    case 'object':
      return JSON.stringify(val, null, 2).replace(/\n/g, '\n  ');
    case 'string':
      return `'${val}'`;
    default:
      return val;
  }
}

theo.registerFormat('common.js', (json) => {
  const props = json.propKeys.map((key) => {
    const prop = json.props[key];
    // Quote if the value is not a number or an object
    return `${javascriptConst(prop.package, prop.name)}: ${getValue(prop.value)}`;
  }).join(',\n  ');

  return `'use strict';\n\nmodule.exports = {\n  ${props}\n};`;
});