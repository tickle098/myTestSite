/**
 * Created by john.montoya on 8/1/14.
 */

/*

 * Installing the CLI
 * npm install -g grunt-cli
 *
 * Working with an existing Grunt project
 * Assuming that the Grunt CLI has been installed and that the project has
 * already been configured with a package.json and a Gruntfile, it's very easy to start working with Grunt:

 1. Change to the project's root directory.
 2. Install project dependencies with
 "npm install".
 3. Run Grunt with
 "grunt"

 That's really all there is to it. Installed Grunt tasks can be listed by running grunt --help but it's
 usually a good idea to start with the project's documentation.


 */


module.exports = function (grunt) {

    'use strict';

    // List all project files for linting/beautifing. ! specifies an exclusion
    var projectJsFiles = [ 'app.js'];

    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        // Clean stuff up
        clean: {
            // Clean any pre-commit hooks in .git/hooks directory
            hooks: ['.git/hooks/pre-commit']
        },
        // Run shell commands
        shell: {
            hooks: {
                // Copy the project's pre-commit hook into .git/hooks
                command: 'cp git-hooks/pre-commit .git/hooks/'
            },
            hooks2: {
                // Copy the project's pre-commit hook into .git/hooks
                command: 'chmod 755 .git/hooks/pre-commit'
            }
        },
        jsvalidate: {
            options:{
                globals: {},
                esprimaOptions: {},
                verbose: false
            },
            targetName:{
                files:{
                    src:[ '<%=jshint.all%>' ]
                }
            }
        },
        jsbeautifier : {
            modify: {
                src: [ '<%=jshint.all%>' ],
                options: {
                    config: '.jsbeautifyrc'
                }
            },
            verify: {
                src: [ '<%=jshint.all%>' ],
                options: {
                    mode: 'VERIFY_ONLY',
                    config: '.jsbeautifyrc'
                }
            }
        },
        jscs: {
            options: {
                config: '.jscsrc'
            },
            files : [ '<%=jshint.all%>' ]
        },
        jshint : { // Explanations at http://jslinterrors.com/
            all : projectJsFiles,
            options: {
                jshintrc: '.jshintrc' // relative to Gruntfile
            }
        },

        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*.js']
            }
        }
    });

    // Load the plugins
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    require('time-grunt')(grunt);

    // task(s).

    // Clean the .git/hooks/pre-commit file then copy in the latest version
    grunt.registerTask('hookmeup', ['clean:hooks', 'shell:hooks', 'shell:hooks2']);

    // pre-commit hook task
    grunt.registerTask('pre-commit-task', ['jsvalidate', 'jshint', 'jsbeautifier:modify', 'jscs']);

    grunt.registerTask('codestyle', ['jscs']);

    grunt.registerTask('format', ['jsbeautifier:modify']);

    grunt.registerTask('verify', ['jsbeautifier:verify']);

    grunt.registerTask('default', ['jsvalidate', 'jshint', 'jsbeautifier:modify', 'jscs']);
};