import globby from 'globby';

let packages = globby.sync([process.cwd() + '/package.json', process.cwd() + '/packages/**/package.json']);
let versions = {};

packages.forEach((packageJsonPath) => {
  const packageJson = require(packageJsonPath);
  versions[packageJson.name.replace('@sproutsocial/', '')] = packageJson.version;
});

export default versions;
