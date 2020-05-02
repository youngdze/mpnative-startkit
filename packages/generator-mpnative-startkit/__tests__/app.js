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
    ]);
  });
});
