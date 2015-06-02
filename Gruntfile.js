module.exports = function(grunt) {
    'use strict';

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // based on http://www.sitepoint.com/writing-awesome-build-script-grunt/

    grunt.initConfig({
        copy: {
            build: {
                cwd: 'source',
                src: ['**', '!**/*.less', '!**/*.jade'],
                dest: 'build',
                expand: true
            }
        },
        clean: {
            build: {
                src: ['build']
            },
            stylesheets: {
                src: ['build/assets/css/**/*.css']
            }
        },
        jade: {
            compile: {
                options: {
                    data: {},
                    pretty: true
                },
                files: [{
                    cwd: 'source',
                    src: '**/*.jade',
                    dest: 'build',
                    expand: true,
                    ext: '.html'
                }]
            }
        },
        cssmin: {
            build: {
                files: {
                    'build/assets/css/all.css': ['build/assets/css/**/*.css']
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ['source/assets/less']
                },
                files: [{
                    cwd: 'source/assets/less',
                    src: '**/*.less',
                    dest: 'build/assets/css',
                    expand: true,
                    ext: '.css'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            less: {
                files: 'source/**/*.less',
                tasks: ['stylesheets'],
                options: {
                    nospawn: true
                }
            },
            jade: {
                files: 'source/**/*.jade',
                tasks: ['jade']
            }
        },
        connect: {
            server: {
                options: {
                    port: 6661,
                    base: 'build',
                    hostname: '*',
                    livereload: true,
                    open: true
                }
            }
        }
    });

    grunt.registerTask('stylesheets', 'Compile and minify the stylesheets.', ['clean:stylesheets', 'less', 'cssmin']);
    grunt.registerTask('build', 'Compiles all of the assets and copies the files to the build directory.', ['clean:build', 'copy', 'stylesheets', 'jade']);
    grunt.registerTask('default', 'Build files and starts a server on port 6661 with LiveReload.', ['build', 'connect', 'watch']);
};