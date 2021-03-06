'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('harbour:app', function () {
  var projectName = 'testproject';
  var mockPrompts = {
    projectName: projectName,
    isPrivate: true
  };

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts(mockPrompts)
      .on('end', done);
  });

  it('should generate the same projectName in every file', function () {
    assert.file([
      'bower.json',
      'package.json'
    ]);

    assert.fileContent(
      'package.json',
      new RegExp(projectName)
    );

    assert.fileContent(
      'bower.json',
      new RegExp(projectName)
    );

  });
});
