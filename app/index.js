'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slug = require('slug');

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
			name: 'projectName',
			message: 'Please the project\'s name'
		},
		{
			type: 'confirm',
			name: 'isPrivate',
			message: 'Is this a private project?',
			default: true
		}/*,
		{
			type: 'confirm',
			name: 'addFramework',
			message: 'Would you like to add a front end framework?',
			default: false
		},
		{
			type: 'checkbox',
			name: 'framework',
			message: 'Which framework would you like to include?',
			when: function (props) {
				return props.addFramework;
			},
			choices: [
				{
					name: 'Angular',
					value: 'angular'
				},
				{
					name: 'Backbone',
					value: 'Backbone'
				}
			]
		}*/];

		this.prompt(prompts, function (props) {
			this.props = props;
			// To access props later use this.props.someOption;

			done();
		}.bind(this));
	},

	config: function() {
		this.config.set('projectName', this.props.projectName);

        this.config.save();
	},

	writing: {

		copy: function() {
			this.files = this.expandFiles('**/*', { cwd: this.sourceRoot(), dot: true });

			var ignores = [
				'.git',
				'LICENSE',
				'README.md'
			];

			this.files.forEach(function(file) {
				if (ignores.indexOf(file) !== -1) {
					return;
				}

				this.copy(file, file);
			}, this);   
		},
		parse: function () {

			// Read package data
			var packageData = this.fs.readJSON('package.json');

			// Overwrite package name with project name
			packageData.name = slug(this.props.projectName, { lower: true });
			packageData.description = this.props.projectName;

			if(this.props.isPrivate) {
				packageData.private = true;
			}

			this.fs.writeJSON('package.json', packageData);
		}
	},

	install: function () {
		this.installDependencies();
	}
});
