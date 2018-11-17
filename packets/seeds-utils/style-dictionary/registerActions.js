const fs = require('fs');
const rimraf = require('rimraf');
const pascalCase = require('pascal-case');

const valueAtKeyPath = (array, keyPath) => keyPath.split('.').reduce((previous, current) => previous[current], array);

const groupArrayBy = (array, key) =>
  array.reduce((rv, x) => {
    (rv[valueAtKeyPath(x, key)] = rv[valueAtKeyPath(x, key)] || []).push(x);
    return rv;
  }, {});

function registerActions(styleDictionary) {
  styleDictionary.registerAction({
    name: 'ios-assets',
    do: function(dictionary, config) {
      const rootPath = config.buildPath + `ios/`;
      rimraf.sync(rootPath);
      fs.mkdirSync(rootPath);
      fs.writeFileSync(
        rootPath + 'Contents.json',
        JSON.stringify(
          {
            info: {
              version: 1,
              author: 'xcode'
            }
          },
          null,
          2
        )
      );

      const isNetwork = config.network === true ? true : false;
      const types = groupArrayBy(dictionary.allProperties, 'attributes.type');

      Object.keys(types).forEach(type => {
        const directory = pascalCase(type);
        fs.mkdirSync(rootPath + directory);
        fs.writeFileSync(
          rootPath + `${directory}/` + 'Contents.json',
          JSON.stringify(
            {
              info: {
                version: 1,
                author: 'xcode'
              }
            },
            null,
            2
          )
        );

        types[type].forEach(item => {
          const subdirectory = `${isNetwork ? '' : `${directory} `}${pascalCase(item.name)}.colorset`;
          fs.mkdirSync(rootPath + `${directory}/` + subdirectory);

          const red = item.attributes.rgb.r / 255;
          const green = item.attributes.rgb.g / 255;
          const blue = item.attributes.rgb.b / 255;

          fs.writeFileSync(
            rootPath + `${directory}/` + `${subdirectory}/` + 'Contents.json',
            JSON.stringify(
              {
                info: {
                  version: 1,
                  author: 'xcode'
                },
                colors: [
                  {
                    idiom: 'universal',
                    color: {
                      'color-space': 'srgb',
                      components: {
                        red: `${red.toFixed(3)}`,
                        alpha: '1.000',
                        blue: `${blue.toFixed(3)}`,
                        green: `${green.toFixed(3)}`
                      }
                    }
                  }
                ]
              },
              null,
              2
            )
          );
        });
      });
    },
    undo: function(dictionary, config) {
      rimraf.sync(config.buildPath + `ios`);
    }
  });
}

module.exports = registerActions;
