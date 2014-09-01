module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dentist: {
			build: {
				options: {
					include_js: "js/app.min.js",
					include_css: "css/app.css"
				},
				src: 'index.html',
				dest_js: 'dist/app.init.js',
				dest_css: 'tmp/null',
				dest_html: 'dist/index.html'
			}
		},
		concat: {
			index: {
				options: {
					separator: ";"
				},
				src: [
					"js/contentful.min.js",
					"js/handlebars.js",
					"js/moment.js",
					"js/showdown.js",
					"js/beast.js",
				],
				dest: 'dist/app.concat.js',
			},
			css: {
				options: {
					separator: "\n\n",
				},
				src: [
					"css/fonts.css",
					"css/beast.css",
				],
				dest: 'dist/css/app.css',
			}
		},

		uglify: {
			options: {
				banner: '/* EDWEENA */\n'
			},
			index: {
				src: 'dist/app.concat.js',
				dest: 'dist/assets/javascripts/app.min.js'
			}
		},

    clean: {
      release: [
        "dist/app.concat.js",
        "dist/app.init.js",
        "tmp/"
      ],
    },

    copy: {
      build: {
        files: [
          {
            nonull: true,
            expand: true,
            src: [
            	'fonts/*',
            	'favicon.ico'
            	// 'icon2.jpg',
            ],
            dest: "dist/"
          },
        ]
      },
    }
	});

	// Load tasks that we'll be using
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-dentist');

	// Default task(s).
	grunt.registerTask('default', ['dentist', 'concat', 'uglify', 'copy', 'clean']);
};