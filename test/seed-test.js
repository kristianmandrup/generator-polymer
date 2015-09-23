/*global describe, beforeEach, it*/

const path    = require('path');
const helpers = require('yeoman-generator').test;
const assert  = require('yeoman-generator').assert;

describe('yo polymer:seed with WCT test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../seed'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['seed-el'])
      .withPrompt({
        ghUser: 'test-user',
        elementName: 'seed-el',
        includeWCT: true
      })
      .on('end', done);
  });

  it('creates expected files', () => {
    let expected = [
      'bower.json',
      '.gitignore',
      'index.html',
      'README.md',
      'seed-el.html',
      'demo/index.html',
      'test/index.html',
      'test/basic-test.html'
    ];

    assert.file(expected);
  });

  it('creates the correct bower.json content', () => {
    assert.fileContent('bower.json', /"name": "seed-el"/);
    assert.fileContent('bower.json', /"main": "seed-el.html"/);
  });

  it('includes WCT', () => {
    assert.fileContent('bower.json', /web-component-tester/gm);
  });

});

describe('yo polymer:seed without WCT test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../seed'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['seed-el'])
      .withPrompt({
        ghUser: 'test-user',
        elementName: 'seed-el',
        includeWCT: false
      })
      .on('end', done);
  });

  it('does not include WCT', () => {
    assert.noFileContent('bower.json', /web-component-tester/gm);
  });

});
