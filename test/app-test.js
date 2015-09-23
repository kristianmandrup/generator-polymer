/*global describe, beforeEach, it*/

const path    = require('path');
const helpers = require('yeoman-generator').test;
const assert  = require('yeoman-generator').assert;

describe('yo polymer:app with WCT test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['--skip-install'])
      .withPrompt({
        includeWCT: true,
        includeRecipes: false
      })
      .on('end', done);
  });

  it('creates expected files', () => {
    let expected = [
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jscsrc',
      '.jshintrc',
      'bower.json',
      'gulpfile.js',
      'LICENSE.md',
      'package.json',
      'README.md',
      'wct.conf.json',
      'app'
    ];

    assert.file(expected);
  });

  it('includes WCT', () => {
    assert.fileContent('bower.json', /web-component-tester/gm);
    assert.fileContent('bower.json', /test-fixture/gm);
    assert.fileContent('package.json', /web-component-tester/gm);
    assert.fileContent('gulpfile.js', /^require\('web-component-tester'\).+/gm);
  });

});

describe('yo polymer:app without WCT test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['--skip-install'])
      .withPrompt({
        includeWCT: false,
        includeRecipes: false
      })
      .on('end', done);
  });

  it('creates expected files', () => {
    let expected = [
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jscsrc',
      '.jshintrc',
      'bower.json',
      'gulpfile.js',
      'LICENSE.md',
      'package.json',
      'README.md',
      'app'
    ];

    assert.file(expected);
  });

  it('does not include WCT', () => {
    assert.noFileContent('bower.json', /web-component-tester/gm);
    assert.noFileContent('bower.json', /test-fixture/gm);
    assert.noFileContent('package.json', /web-component-tester/gm);
    assert.fileContent(
      'gulpfile.js', /^\/\/\srequire\('web-component-tester'\).+/gm
    );
  });

});

describe('yo polymer:app with Recipes test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['--skip-install'])
      .withPrompt({
        includeWCT: false,
        includeRecipes: true
      })
      .on('end', done);
  });

  it('creates expected files', () => {
    let expected = [
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jscsrc',
      '.jshintrc',
      'bower.json',
      'gulpfile.js',
      'LICENSE.md',
      'package.json',
      'README.md',
      'app',
      'docs'
    ];

    assert.file(expected);
  });

});


describe('yo polymer:app without Recipes test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['--skip-install'])
      .withPrompt({
        includeWCT: false,
        includeRecipes: false
      })
      .on('end', done);
  });

  it('creates expected files', () => {
    let expected = [
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.jscsrc',
      '.jshintrc',
      'bower.json',
      'gulpfile.js',
      'LICENSE.md',
      'package.json',
      'README.md',
      'app'
    ];

    assert.file(expected);
    assert.noFile(['docs']);
  });

});
