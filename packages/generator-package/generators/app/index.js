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
        message:
          '💡 If the package you are generating does not have tokens yet and it is just documentation, just hit ENTER for the following three prompts and leave them blank.\n\nInitial token name (e.g. `size 100`):'
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
    const dirName = `packages/seeds-${this.props.packageName}`;

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath(`${dirName}/package.json`),
      Object.assign({}, this.props)
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(`${dirName}/README.md`),
      Object.assign({}, this.props)
    );

    this.fs.copyTpl(this.templatePath('docs'), this.destinationPath(`${dirName}/docs`), Object.assign({}, this.props));

    if (this.props.tokenName) {
      this.fs.copyTpl(
        this.templatePath('example/index.js'),
        this.destinationPath(`packages/seeds-docs/src/components/examples/seeds-${this.props.packageName}.js`),
        Object.assign({}, this.props)
      );

      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath(`${dirName}/gulpfile.js`),
        Object.assign({}, this.props)
      );

      this.fs.copyTpl(
        this.templatePath('tokens.yml'),
        this.destinationPath(`${dirName}/tokens.yml`),
        Object.assign({}, this.props)
      );
    }

    const docsPkg = this.fs.readJSON('packages/seeds-docs/package.json');
    docsPkg.dependencies[`@sproutsocial/seeds-${this.props.packageName}`] = '*';
    this.fs.writeJSON('packages/seeds-docs/package.json', docsPkg);
  }

  install() {
    this.spawnCommand('lerna', ['bootstrap']);
  }
};
