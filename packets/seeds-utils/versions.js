const globby = require('globby');

const packages = globby.sync([process.cwd() + '/packages/seeds-*/package.json', process.cwd() + '/package.json']);
const versions = {};

packages.forEach(packageJsonPath => {
  const packageJson = require(packageJsonPath);
  versions[packageJson.name.replace('@sproutsocial/', '')] = packageJson.version;
});

module.exports = versions;

// Used to get the versions and stability of Seeds packets
// Use it like this:
//
// const versions = require('@sproutsocial/seeds-utils/versions');
// versions["packageName"] = "x.x.x"
