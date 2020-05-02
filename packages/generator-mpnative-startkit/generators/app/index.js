const path = require('path');
const fs = require('fs');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the smashing ${chalk.red(
          'generator-mpnative-startkit',
        )} generator!`,
      ),
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: '🚀请输入项目名称',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'version',
        message: '🚀输入项目版本号',
        default: '1.0.0',
      },
      {
        type: 'input',
        name: 'description',
        message: '🚀请输入项目描述',
        default: '',
      },
      {
        type: 'input',
        name: 'author',
        message: '🚀请输入项目作者',
        default: '',
      },
      {
        type: 'input',
        name: 'appid',
        message: '🚀请输入小程序的 appid',
        default: '',
      },
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\n看起来"${this.props.name}"目录不存在，\n将会创建该目录。\n`);

      if (
        !fs.existsSync(this.props.name) ||
        !fs.lstatSync(this.props.name).isDirectory()
      ) {
        fs.mkdirSync(this.props.name);
      }

      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    const rootFileList = [
      '.commitlintrc.js',
      '.editorconfig',
      '.gitignore',
      '.prettierignore',
      '.prettierrc',
      '.feflowrc.json',
      'readme.md',
      'tsconfig.json',
      'src',
      'typings',
    ];

    rootFileList.forEach((file) => {
      this.fs.copy(
        this.templatePath(file.replace(/^\./, '_')),
        this.destinationPath(file),
      );
    });

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        version: this.props.version,
        description: this.props.description,
        author: this.props.author,
        license: this.props.license,
      },
    );

    this.fs.copyTpl(
      this.templatePath('project.config.json'),
      this.destinationPath('project.config.json'),
      {
        name: this.props.name,
        description: this.props.description,
        appid: this.props.appid,
      },
    );
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true,
    });
  }
};
