const theo = require('theo');

theo.registerFormat('sketch.sketchpalette', json => {
  const props = json.propKeys.map(key => {
    const prop = json.props[key];

    if (prop.type !== 'color') {
      return;
    }

    return prop.value;
  });

  return JSON.stringify({
    compatibleVersion: 1.5,
    pluginVersion: 1.5,
    colors: props
  });
});
