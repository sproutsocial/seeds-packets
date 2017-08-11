const theo = require('theo');

theo.registerFormat('sketchtext.json', json => {
  const fontSizes = json.propKeys.filter(key => json.props[key].type === 'font size');

  return JSON.stringify({
    styles: fontSizes.map(key => json.props[key].value)
  });
});
