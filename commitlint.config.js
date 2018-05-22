const {readdirSync, statSync} = require('fs');
const {join} = require('path');

const packets = readdirSync('./packets').filter(f => statSync(join('./packets', f)).isDirectory());

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['fix', 'feat', 'build', 'docs', 'perf', 'test', 'chore']],
    'scope-case': [0, 'always', 'lower-case'],
    'scope-enum': [1, 'always', [...packets, 'dependencies', 'build']]
  }
};
