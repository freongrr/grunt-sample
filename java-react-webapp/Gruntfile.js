module.exports = function (grunt) {
    'use strict';

    var pkg = grunt.file.readJSON('package.json');

    // Project configuration.
    grunt.initConfig({
        src_dir: 'src/main/webapp',
        src_main: 'src/main/webapp/index.js',
        dist_dir: 'target/java-react-webapp/',
        dist_main: 'target/java-react-webapp/bundle.js',
        test_dir: 'src/test/webapp/',
        test_reports_dir: 'target/istanbul-reports/',

        // Delete output files
        clean: {
            default: ['<%= dist_dir %>', '<%= test_reports_dir %>']
        },

        // Syntax (and style) check
        eslint: {
            target: ['<%= src_dir %>/*.js', '<%= test_dir %>/*.js']
        },

        // Static type checks
        flowbin: {
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

        // This keeps grunt running and copy the www resources when they change
        // But it's browserify:watch that re-regenerates the bundle
        watch: {
            default: {
                files: ['<%= src_dir %>/*.html', '<%= src_dir %>/*.css', '<%= dist_main %>'],
                tasks: ['eslint', 'flowbin', 'copy']
            }
        }
    });

    grunt.event.on('coverage', function (lcov, done) {
        // Let Grunt know the test coverage is done
        done();
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-flowbin');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.registerTask('build', ['clean', 'eslint', 'flowbin', 'browserify:default', 'copy']);
    grunt.registerTask('test', ['mocha_istanbul']);

    // Aliases
    grunt.registerTask('default', ['build', 'test']);
    grunt.registerTask('start', ['browserify:watch', 'watch']);
};
