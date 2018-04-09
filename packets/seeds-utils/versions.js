const globby = require('globby');

const packages = globby.sync([process.cwd() + '/packages/seeds-*/package.json', process.cwd() + '/package.json']);
const versions = {};

packages.forEach(packageJsonPath => {
  const packageJson = require(packageJsonPath);
  versions[packageJson.name.replace('@sproutsocial/', '')] = {
    version: packageJson.version,
    stability: packageJson.stability
  };
});

module.exports = versions;
