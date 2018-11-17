const StyleDictionary = require('style-dictionary');
const pascalCase = require('pascal-case');
const snakeCase = require('lodash.snakecase');
const kebabCase = require('lodash.kebabcase');
const constantCase = str => snakeCase(str).toUpperCase();
const getLineHeight = require('../getlineheight');
const registerTemplates = require('./registerTemplates');
const registerActions = require('./registerActions');
const ase = require('ase-utils');
const Color = require('tinycolor2');

const BASE_FONT_SIZE = 18;

const getComponents = (path, separator1, separator2) => {
  const term1 = path[0]; // category
  const term2 = path[1]; // type
  const term3 = path[2]; // item
  const includeTerm1 = term1 === null ? false : true;
  const includeTerm2 = term2.toLowerCase() !== 'other';
  const includeTerm3 = term3 !== undefined && term2.toLowerCase() !== term3.toLowerCase();

  if (includeTerm2 && includeTerm3) {
    return (includeTerm1 ? term1 + separator1 : '') + term2 + separator2 + term3;
  } else if (includeTerm2 && !includeTerm3) {
    return (includeTerm1 ? term1 + separator1 : '') + term2;
  } else if (!includeTerm2 && includeTerm3) {
    return (includeTerm1 ? term1 + separator1 : '') + term3;
  } else if (!includeTerm2 && !includeTerm3) {
    return term1;
  }
};

StyleDictionary.registerTransform({
  name: 'scss/suit',
  type: 'name',
  transformer: function(props) {
    return getComponents([pascalCase(props.path[0]), props.path[1], kebabCase(props.path[2])], '-', '--');
  }
});

StyleDictionary.registerTransform({
  name: 'css/suit',
  type: 'name',
  transformer: function(props) {
    return getComponents([kebabCase(props.path[0]), props.path[1], kebabCase(props.path[2])], '-', '-');
  }
});

StyleDictionary.registerTransform({
  name: 'name/cti/constant',
  type: 'name',
  transformer: function(props) {
    return getComponents(
      [constantCase(props.path[0]), constantCase(props.path[1]), constantCase(props.path[2])],
      '_',
      '_'
    );
  }
});

StyleDictionary.registerTransform({
  name: 'name/ci/constant',
  type: 'name',
  transformer: function(props) {
    const category = constantCase(props.path[0]);
    const item = constantCase(props.path[2]);
    return `${category}_${item}`;
  }
});

StyleDictionary.registerTransform({
  name: 'name/ti/snake',
  type: 'name',
  transformer: function(props) {
    return getComponents([null, snakeCase(props.path[1]), snakeCase(props.path[2])], '_', '_');
  }
});

StyleDictionary.registerTransform({
  name: 'sketch/color',
  type: 'attribute',
  transformer: function(props) {
    return {
      category: 'color',
      type: 'base'
    };
  }
});

StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  transformer: function(props) {
    return props.value + 'px';
  }
});

StyleDictionary.registerTransform({
  name: 'attribute/tokens',
  type: 'attribute',
  transformer: function(props) {
    const category = props.path[0];
    const type = props.path[1];
    const item = props.path[2];
    const includeItem = item !== undefined;

    return {
      sass: `$${getComponents([pascalCase(category), type, kebabCase(item)], '-', '--')}`,
      sassMixin: `${getComponents([pascalCase(category), type, kebabCase(item)], '-', '--')}`,
      css: `--${getComponents([category, type, kebabCase(item)], '-', '--')}`,
      app: `${pascalCase(type)}${includeItem ? ` ${item}` : ''}`,
      javascript: `${getComponents([constantCase(category), constantCase(type), constantCase(item)], '_', '_')}`,
      android: `${getComponents([null, snakeCase(props.path[1]), snakeCase(props.path[2])], '_', '_')}`
    };
  }
});

StyleDictionary.registerTransform({
  name: 'attribute/typography',
  type: 'attribute',
  matcher: function(props) {
    return props.attributes.type === 'size';
  },
  transformer: function(props) {
    const lineHeightProportional = getLineHeight(props.attributes.item, props.value) / props.value;
    const lineHeightPx = getLineHeight(props.attributes.item, props.value);
    const remValue = props.value / BASE_FONT_SIZE;

    return {
      lineHeightProportional: lineHeightProportional,
      lineHeightPx: lineHeightPx,
      remValue: remValue + 'rem'
    };
  }
});

StyleDictionary.registerTransform({
  name: 'attribute/space',
  type: 'attribute',
  matcher: function(props) {
    return props.attributes.type === 'size';
  },
  transformer: function(props) {
    return {
      remValue: props.original.value / BASE_FONT_SIZE
    };
  }
});

StyleDictionary.registerTransform({
  name: 'attribute/rgb',
  type: 'attribute',
  transformer: function(props) {
    return {
      rgb: Color(props.value).toRgb()
    };
  }
});

StyleDictionary.registerTransform({
  name: 'attribute/networkcolor',
  type: 'attribute',
  transformer: function(props) {
    return {
      category: 'color'
    };
  }
});

StyleDictionary.registerTransform({
  name: 'attribute/bambu',
  type: 'attribute',
  matcher: function(props) {
    return props.attributes.type.includes('bambu');
  },
  transformer: function(props) {
    return {
      category: 'bambu'
    };
  }
});

StyleDictionary.registerFormat({
  name: 'ase',
  formatter: function(dictionary, config) {
    const colors = dictionary.allProperties.map(property => {
      return {
        name: property.name,
        model: 'RGB',
        color: [property.attributes.rgb.r, property.attributes.rgb.g, property.attributes.rgb.b],
        type: 'global'
      };
    });

    const aseJSON = {
      version: '1.0',
      groups: [],
      colors: colors
    };

    return ase.encode(aseJSON);
  }
});

registerTemplates(StyleDictionary);
registerActions(StyleDictionary);

module.exports = StyleDictionary;
