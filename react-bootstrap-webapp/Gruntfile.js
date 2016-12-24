module.exports = function(grunt) {
    'use strict';

    var pkg = grunt.file.readJSON('package.json');

    // Project configuration.
    grunt.initConfig({
        src_dir: 'src/',
        src_main: 'src/index.js',
        dist_dir: 'dist/',
        dist_main: 'dist/bundle.js',
        test_dir: 'test/',
        test_reports_dir: 'test-reports/',

        // Delete output files
        clean: {
            default: ['<%= dist_dir %>', '<%= test_reports_dir %>']
        },

        // TODO : use eslint instead:
        // https://www.npmjs.com/package/grunt-eslint
        jshint: {
            options: {
                esversion: 6
            },
            // default: ['<%= src_dir %>/*.js']
            default: []
        },

        // Static type checks
        flowbin: {
            // TODO : watch for changes
            check: {},
        },

        // Compile for the browser
        browserify: {
            options: {
                transform: [
                    // presets are in .babelrc
                    ['babelify']
                ]
            },
            default: {
                src: ['<%= src_main %>'],
                dest: '<%= dist_main %>'
            },
            watch: {
                src: ['<%= src_main %>'],
                dest: '<%= dist_main %>',
                options: {
                    watch: true,
                    browserifyOptions: {
                        // Generate source maps
                        debug: true
                    }
                }
            }
        },

        // Copy static files to the dist directory
        copy: {
            sources: {
                expand: true,
                cwd: '<%= src_dir %>',
                src: ['*.html', '*.css', '*.gif', '*.jpg', '*.svg'],
                dest: '<%= dist_dir %>'
            },
            bootstrap: {
                expand: true,
                cwd: 'node_modules/bootstrap/dist/',
                src: ['css/bootstrap.min.css', 'css/bootstrap.min.css.map'],
                dest: '<%= dist_dir %>'
            }
        },

        // Run tests
        mocha_istanbul: {
            default: {
                src: '<%= test_dir %>',
                options: {
                    mochaOptions: ['--compilers', 'js:babel-register'],
                    recursive: true,
                    coverageFolder: '<%= test_reports_dir %>',
                    reportFormats: ['html']
                }
            }
        },

        // Package for distribution
        compress: {
            default: {
                options: {
                    archive: function(x) {
                        return pkg.name + '-' + pkg.version + '.zip';
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= dist_dir %>',
                    src: ['**/*']
                }]
            }
        },

        // Run the backend in the background
        'http-server': {
            default: {
                root: '<%= dist_dir %>',
                runInBackground: true,
                openBrowser: true
            }
        },

        run: {
            test_server: {
                options: {
                    wait: false
                },
                args: [
                    '<%= server_main %>',
                ]
            }
        },

        // This keeps grunt running and copy the www resources when they change
        // But it's browserify:watch that re-regenerates the bundle
        watch: {
            default: {
                files: ['<%= src_dir %>/*.html', '<%= src_dir %>/*.css', '<%= dist_main %>'],
                tasks: ['jshint', 'copy']
            }
        }
    });

    grunt.event.on('coverage', function(lcov, done) {
        // console.log(lcov);
        done(); // or done(false); in case of error
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-flowbin');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('build', ['clean', 'jshint', 'flowbin', 'browserify:default', 'copy']);
    grunt.registerTask('test', ['mocha_istanbul']);
    grunt.registerTask('package', ['compress']);
    grunt.registerTask('default', ['build', 'test', 'package']);
    grunt.registerTask('start', ['http-server', 'browserify:watch', 'watch']);
};
