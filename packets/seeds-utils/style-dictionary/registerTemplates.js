const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

// This helper allows us to check for equality in Handlebars
// ex: {{#ifEquals arg1 arg2}}
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

// Used to format JSON output and get proper string escaping
Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context);
});

// Return the compiled Handlebars template for a given template file name
function getTemplateForFile(file) {
  return Handlebars.compile(fs.readFileSync(path.resolve(__dirname, file)).toString());
}

// A map of our templates in the format { templateName: templateFileName.hbs }
const templates = {
  'js-exports': 'js-exports.hbs',
  'js-exports-number': 'js-exports-number.hbs',
  'js-exports-typography': 'js-exports-typography.hbs',
  'js-exports-typography-unitless': 'js-exports-typography-unitless.hbs',
  json: 'json.hbs',
  'color-json': 'color-json.hbs',
  'typography-json': 'typography-json.hbs',
  'typography-scss': 'typography-scss.hbs',
  'typography-css': 'typography-css.hbs',
  'space-css': 'space-css.hbs',
  'space-json': 'space-json.hbs'
};

// Loop over every template file, get the Handlebars template, and register it
// as a format with the given StyleDictionary object.
function registerTemplates(styleDictionary) {
  Object.keys(templates).map(template => {
    const handlebarsTemplate = getTemplateForFile(`templates/${templates[template]}`);

    styleDictionary.registerFormat({
      name: `template/${template}`,
      formatter: function(dictionary, platform) {
        return handlebarsTemplate({
          properties: dictionary.properties,
          options: platform
        });
      }
    });
  });
}

module.exports = registerTemplates;
