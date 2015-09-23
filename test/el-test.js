/*global describe, beforeEach, it*/

const path    = require('path');
const fs      = require('fs-extra');
const helpers = require('yeoman-generator').test;
const assert  = require('yeoman-generator').assert;

describe('yo polymer:el test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['--skip-install'])
      .withPrompt({
        includeWCT: true
      })
      .on('end', done);
  });

  before((done) => {
    helpers.run(path.join(__dirname, '../el'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['my-foo'])
      .withPrompt({
        includeImport: false
      })
      .on('end', done);
  });

  it('creates expected files', () => {
    let expected = [
      'app/elements/my-foo/my-foo.html'
    ];

    assert.file(expected);
  });

  it('imports optional dependencies', (done) => {
    helpers.run(path.join(__dirname, '../el'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['fancy-menu', 'iron-ajax', 'iron-a11y-keys'])
      .withPrompt({
        includeImport: false
      })
      .on('end', () => {
        assert.fileContent(
          'app/elements/fancy-menu/fancy-menu.html', /<link rel="import" href="..\/..\/bower_components\/iron-ajax\/iron-ajax.html">/
        );
        assert.fileContent(
          'app/elements/fancy-menu/fancy-menu.html', /<link rel="import" href="..\/..\/bower_components\/iron-a11y-keys\/iron-a11y-keys.html">/
        );
        done();
      });
  });

});

describe('yo polymer:el --docs test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['--skip-install'])
      .withPrompt({
        includeWCT: true
      })
      .on('end', done);
  });

  before((done) => {
    helpers.run(path.join(__dirname, '../el'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['docs-el'])
      .withOptions({ 'docs': true })
      .withPrompt({
        includeImport: false
      })
      .on('end', done);
  });

  it('creates expected files', () => {
    let expected = [
      'app/elements/docs-el/docs-el.html',
      'app/elements/docs-el/index.html',
      'app/elements/docs-el/demo/index.html'
    ];

    assert.file(expected);
  });
});

describe('yo polymer:el --path test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['--skip-install'])
      .withPrompt({
        includeWCT: true
      })
      .on('end', done);
  });

  before((done) => {
    helpers.run(path.join(__dirname, '../el'))
      .inDir(path.join(__dirname, './tmp'))
      .withArguments(['path-el'])
      .withOptions({ 'path': 'foo/bar/baz' })
      .withPrompt({
        includeImport: false
      })
      .on('end', done);
  });

  it('creates expected files', () => {
    let expected = [
      'app/elements/foo/bar/baz/path-el.html'
    ];

    assert.file(expected);
  });

  it('creates the right path to polymer', () => {
    assert.fileContent(
      'app/elements/foo/bar/baz/path-el.html',
      /<link rel="import" href="..\/..\/..\/..\/bower_components\/polymer\/polymer.html">/
    );
  });
});

describe('yo polymer:el TDD test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../el'))
      .inDir(path.join( __dirname, './tmp'), (dir) => {
        fs.mkdirSync(dir + '/app');
        fs.mkdirSync(dir + '/app/test');
        fs.copySync(
          path.join(__dirname, '../app/templates/polymer-starter-kit/app/test/index.html'),
          dir + '/app/test/index.html'
        );
      })
      .withArguments(['x-tag'])
      .withPrompt({
        includeImport: false,
        testType: 'TDD'
      })
      .on('end', () => {
        done();
      });
  });

  it('creates expected files', () => {
    let expected = [
      'app/test/index.html',
      'app/test/x-tag-basic.html',
      'app/elements/x-tag/x-tag.html'
    ];

    assert.file(expected);
  });

  it('Modifies index.html properly (with previous items)', () => {
    assert.fileContent(
      'app/test/index.html',
      /'my-list-basic.html', 'x-tag-basic.html'\]\);/ // Was inserted at the end of the array properly
    );
  });

  it('does not include any words for BDD', () => {
    assert.noFileContent(
      'app/test/x-tag-basic.html',
      /(describe\()|(before\()|(it\()/  // These words only appear in BDD test. This is a TDD
    )
  });
});

describe('yo polymer:el BDD test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../el'))
      .inDir(path.join( __dirname, './tmp'), (dir) => {
        fs.mkdirSync(dir + '/app');
        fs.mkdirSync(dir + '/app/test');
        fs.copySync(
          path.join(__dirname, '../app/templates/polymer-starter-kit/app/test/index.html'),
          dir + '/app/test/index.html'
        );
      })
      .withArguments(['x-tag'])
      .withPrompt({
        includeImport: false,
        testType: 'BDD'
      })
      .on('end', () => {
        done();
      });
  });

  it('creates expected files', () => {
    let expected = [
      'app/test/index.html',
      'app/test/x-tag-basic.html',
      'app/elements/x-tag/x-tag.html'
    ];

    assert.file(expected);
  });

  it('does not include any words for TDD', () => {
    assert.noFileContent(
      'app/test/x-tag-basic.html',
      /(suite\()|(setup\()|(test\()/  // These words only appear in TDD test. This is a BDD
    )
  });
});

describe('yo polymer:el None test', () => {

  before((done) => {
    helpers.run(path.join(__dirname, '../el'))
      .inDir(path.join( __dirname, './tmp'), (dir) => {
        fs.mkdirSync(dir + '/app');
        fs.mkdirSync(dir + '/app/test');
        fs.copySync(
          path.join(__dirname, '../app/templates/polymer-starter-kit/app/test/index.html'),
          dir + '/app/test/index.html'
        );
      })
      .withArguments(['x-tag'])
      .withPrompt({
        includeImport: false,
        testType: 'None'
      })
      .on('end', () => {
        done();
      });
  });

  it('creates expected files', () => {
    let expected = [
      'app/test/index.html',
      'app/elements/x-tag/x-tag.html'
    ];

    assert.file(expected);
  });

  it('does not create Test files', () => {
    assert.noFile('app/test/x-tag-basic.html');
  });
});
