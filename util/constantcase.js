import snakeCase from 'lodash.snakecase';

const constantCase = (str) => snakeCase(str).toUpperCase();
const javascriptConst = (type, name) => constantCase(`${type} ${name}`);

export default constantCase;
export {
  constantCase,
  javascriptConst
};
