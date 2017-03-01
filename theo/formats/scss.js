import theo from 'theo';

import sassVar from '../../util/sassvar';

theo.registerFormat('scss', (json) =>
  json.propKeys.map((key) => {
    const prop = json.props[key];
    return `${sassVar(prop.package, prop.name)}: ${prop.value};`;
  }).join('\n')
);
