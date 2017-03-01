import theo from 'theo';

import { javascriptConst } from '../../util/constantcase';

theo.registerFormat('common.js', (json) => {
  const props = json.propKeys.map((key) => {
    const prop = json.props[key];
    return `${javascriptConst(prop.type, prop.name)}: '${prop.value}'`;
  }).join(',\n  ');

  return `'use strict';\n\nmodule.exports = {\n  ${props}\n};`;
});