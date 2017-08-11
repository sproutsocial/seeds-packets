const theo = require('theo');
const camelCase = require('lodash.camelcase');

const versions = require('../../versions');

theo.registerFormat('swift', json => {
  const props = json.propKeys
    .map(key => {
      const prop = json.props[key];

      if (prop.type !== 'color') {
        return;
      }

      return `static func ${camelCase(prop.name)}() -> UIColor {\n    ${prop.value}\n  }`;
    })
    .join('\n  ');

  return `import Foundation\n\nextension UIColor {\n  ${props}\n}`;
});
