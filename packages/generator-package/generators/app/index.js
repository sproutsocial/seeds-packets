const Generator = require('yeoman-generator');
const upperFirst = require('lodash.upperfirst');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'packageName',
        message: 'What would you like to call your package (e.g. `color`)?'
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: 'Short description of your package:'
      },
      {
        type: 'input',
        name: 'tokenName',
        message: 'Initial token name (e.g. `size 100`):'
      },
      {
        type: 'input',
        name: 'tokenCategory',
        message: 'Initial token category (e.g. `size`):'
      },
      {
        type: 'input',
        name: 'tokenValue',
        message: 'Initial token value (e.g. `20px`):'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.packageNameTitlecase = upperFirst(this.props.packageName);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('*'),
      this.destinationPath(`packages/seeds-${this.props.packageName}`),
      Object.assign({}, this.props)
    );

    this.fs.copyTpl(
      this.templatePath('docs'),
      this.destinationPath(`packages/seeds-${this.props.packageName}/${this.props.packageName}`),
      Object.assign({}, this.props)
    );
  }

  install() {
    this.spawnCommand('lerna', ['bootstrap']);
  }
};
