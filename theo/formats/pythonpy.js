import theo from 'theo';
import camelCase from 'lodash.camelcase';

import versions from '../../util/versions';

theo.registerFormat('python.py', (json) =>
  json.propKeys.map((key) => {
    const prop = json.props[key];
    return `${camelCase(prop.name)} = '${prop.value}'`;
  }).join('\n')
);