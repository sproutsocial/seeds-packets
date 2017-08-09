const globby = require('globby');

const packages = globby.sync([
  process.cwd() + '/package.json',
  process.cwd() + '/packages/seeds-*/package.json'
]);
const versions = {};

packages.forEach(packageJsonPath => {
  const packageJson = require(packageJsonPath);
  versions[packageJson.name.replace('@sproutsocial/', '')] = packageJson.version;
});

module.exports = versions;
