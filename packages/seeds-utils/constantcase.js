const snakeCase = require('lodash.snakecase');

const constantCase = str => snakeCase(str).toUpperCase();
const javascriptConst = (type, name) => constantCase(`${type} ${name}`);

module.exports = {
  constantCase,
  javascriptConst
};
