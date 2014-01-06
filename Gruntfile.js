module.exports = function(grunt) {
	// Project configuration
	var banner = '/**\n * Featherlight - ultra slim jQuery lightbox\n * Version <%= pkg.version %> - <%= pkg.homepage %>\n *\n * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %> (<%= pkg.author.url %>)\n * MIT Licensed.\n**/';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: banner+'\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'release/<%= pkg.name %>.min.js'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				},
			},
			uses_defaults: ['src/**/*.js'],
		},
		cssmin: {
			options: {
				banner: banner
			},
			minify: {
				src: 'src/<%= pkg.name %>.css',
				dest: 'release/<%= pkg.name %>.min.css'
			}
		},
		jquerymanifest: {
			options: {
				source: grunt.file.readJSON('package.json'),
				overrides: {
					"name": "<%= pkg.name %>",
					"title": "<%= pkg.title %>",
					"dependencies": {
						"jquery": ">=1.7"
					}
				}
			}
		},
		bump: {
			options: {
				files: ['package.json', 'featherlight.jquery.json', 'index.html'],
				updateConfigs: [],
				commit: false,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['-a'], // '-a' for all files
				createTag: false,
				tagName: '%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false,
				pushTo: 'upstream',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-jquerymanifest');
	grunt.loadNpmTasks('grunt-bump');
	/*grunt.loadNpmTasks('grunt-replace');*/

	// Default task(s).
	grunt.registerTask('default', ['uglify','cssmin','jquerymanifest']);
};