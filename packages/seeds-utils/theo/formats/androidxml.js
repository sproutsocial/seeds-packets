const theo = require('theo');

const constantCase = require('../../constantcase').constantCase;

theo.registerFormat('android.xml', json => {
  const props = json.propKeys
    .map(key => {
      const prop = json.props[key];
      const tag = prop.type === 'color' ? 'color' : 'property';
      return `<${tag} name="${constantCase(prop.name)}" category="${prop.category}">${prop.value}</${tag}>`;
    })
    .join('\n  ');

  return `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n  ${props}\n</resources>`;
});
