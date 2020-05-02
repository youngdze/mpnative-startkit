'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-mpnative-startkit:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file([
      '.babelrc',
      '.commitlintrc.js',
      '.editorconfig',
      '.gitignore',
      '.npmrc',
      '.prettierignore',
      '.prettierrc',
      '.yarnrc',
      '.feflowrc.json',
      'readme.md',
      'tsconfig.json',
      'src',
      'typings',
    ]);
  });
});
