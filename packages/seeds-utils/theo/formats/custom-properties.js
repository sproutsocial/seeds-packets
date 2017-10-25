const theo = require('theo');
const cssPropertyName = require('../../css-property-name');

theo.registerFormat('custom-properties.css', json => {
  const vars = json.propKeys
    .map(key => {
      const prop = json.props[key];

      if (typeof prop.value === 'object') {
        const value = `${cssPropertyName(prop.package, prop.name)}: ${prop.value.value};`;
        const properties = Object.keys(prop.value.properties)
          .map(property => `${cssPropertyName(prop.package, prop.name, property)}: ${prop.value.properties[property]};`)
          .join('\n    ');
        return `${value}\n    ${properties}`;
      }

      return `${cssPropertyName(prop.package, prop.name)}: ${prop.value};`;
    })
    .join('\n    ');
  return `
:root {
    ${vars}
}
    `;
});
