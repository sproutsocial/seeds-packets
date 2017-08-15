const theo = require('theo');
const upperFirst = require('lodash.upperfirst');

theo.registerFormat('ase', json => {
  const props = json.propKeys.map(key => {
    const prop = json.props[key];

    if (prop.type !== 'color') {
      return;
    }

    return {
      name: upperFirst(prop.name),
      model: 'RGB',
      type: 'global',
      color: [prop.value.red, prop.value.green, prop.value.blue]
    };
  });

  // Theo requires a string, which is why we're stringifying it here then unstringifying it below
  return JSON.stringify({
    version: '1.0',
    // TODO: Try and make groups work…
    groups: [],
    colors: props
  });
});
