const theo = require('theo');
const camelCase = require('lodash.camelcase');

const versions = require('../../versions');

theo.registerFormat('python.py', json =>
  json.propKeys
    .map(key => {
      const prop = json.props[key];
      return `${camelCase(prop.name)} = '${prop.value}'`;
    })
    .join('\n')
);
