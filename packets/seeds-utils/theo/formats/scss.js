const theo = require('theo');

const sassVar = require('../../sassvar').sassVar;
const suitCssName = require('../../sassvar').suitCssName;

theo.registerFormat('scss', json =>
  json.propKeys
    .map(key => {
      const prop = json.props[key];

      if (typeof prop.value === 'object') {
        let result;
        if (prop.value.value) {
          result = `${sassVar(prop.package, prop.name)}: ${prop.value.value};`;
        }
        if (prop.value.rules) {
          const rules = Object.keys(prop.value.rules)
            .map(rule => `  ${rule}: ${prop.value.rules[rule]};`)
            .join('\n');
          return result + `\n@mixin ${suitCssName(prop.package, prop.name)} {\n${rules}\n}`;
        } else {
          return result;
        }
      }

      return `${sassVar(prop.package, prop.name)}: ${prop.value};`;
    })
    .join('\n')
);
