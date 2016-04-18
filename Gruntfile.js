module.exports = function(grunt) {
    'use strict';

    var pkg = grunt.file.readJSON('package.json');

    // Project configuration.
    grunt.initConfig({
        input_file: 'src/main.js',
        output_dir: 'dist/',
        output_file: 'dist/bundle.js',

        clean: {
            default: ['<%= output_dir %>']
        },

        jshint: {
            default: ['Gruntfile.js', 'src/*.js', 'test/*.js']
        },

        qunit: {
            default: ['test/**/*.html']
        },

        browserify: {
            build: {
                src: ['<%= input_file %>'],
                dest: '<%= output_file %>'
            },
            build_and_watch: {
                src: ['<%= input_file %>'],
                dest: '<%= output_file %>',
                options: {
                    watch: true
                }
            }
        },

        copy: {
            default: {
                expand: true,
                cwd: 'src',
                src: 'index.html',
                dest: '<%= output_dir %>'
            }
        },

        compress: {
            default: {
                options: {
                    archive: function() {
                        return pkg.name + '-' + pkg.version + '.zip';
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= output_dir %>',
                        src: ['**/*'],
                        dest: '/'
                    }
                ]
            }
        },

        'http-server': {
            default: {
                root: '<%= output_dir %>',
                runInBackground: true,
                openBrowser: true
            }
        },

        watch: {
            // This keeps grunt running, but it's the browserify:build_and_watch
            // that re-regenerates the bundle file. Still, we could run 'make'
            // to validate the source code...
            default: {
                files: ['<%= output_file %>'],
                tasks: []
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.registerTask('make', ['clean', 'jshint', 'qunit', 'browserify:build', 'copy']);
    grunt.registerTask('default', ['make']);
    grunt.registerTask('run', ['http-server', 'browserify:build_and_watch', 'watch']);
};
