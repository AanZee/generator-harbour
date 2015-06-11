'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('harbour:app', function () {
  var mockPrompts = {
    projectName: 'Testproject',
    isPrivate: true
  };

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts(mockPrompts)
      .on('end', done);
  });

  it('should create files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc',
      '.csscomb.json',
      '.csslintrc',
      '.gitignore',
      '.jshintignore',
      'gulpfile.js',
      'index.js'
    ]);
  });
});
