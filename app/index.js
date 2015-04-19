'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'You\'re about to install ' + chalk.blue('Harbour') + '!'
		));

		var prompts = [{
			type: 'confirm',
			name: 'someOption',
			message: 'Would you like to enable this option?',
			default: true
		}];

		this.prompt(prompts, function (props) {
			this.props = props;
			// To access props later use this.props.someOption;

			done();
		}.bind(this));
	},

	writing: function() {
		this.files = this.expandFiles('**/*', { cwd: this.sourceRoot(), dot: true });

		var ignores = [
			'.git',
			'LICENSE',
			'README.md',
		];

		this.files.forEach(function(file) {
			if (ignores.indexOf(file) !== -1) {
				return;
			}

			this.copy(file, file);
		}, this);   
	},

	install: function () {
		this.installDependencies();
	}
});
