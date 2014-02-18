
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=80; */

/**
 * @package     neatline
 * @subpackage  text
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-phpunit');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-symbolic-link');

  var pkg     = grunt.file.readJSON('package.json');
  var nlPaths = grunt.file.readJSON('../Neatline/paths.json');
  var paths   = grunt.file.readJSON('paths.json');

  grunt.initConfig({

    symlink: {

      neatline: {
        link: 'Neatline',
        target: '../Neatline',
        options: {
          overwrite: true
        }
      }

    },

    connect: {

      server: {
        options: {
          keepalive: true,
          port: 1337
        }
      }

    },

    clean: {

      payloads: [
        paths.payloads.shared.js,
        paths.payloads.shared.css
      ],

      fixtures: [
        paths.jasmine+'/fixtures/*.json',
        paths.jasmine+'/fixtures/*.html'
      ],

      pkg: 'pkg'

    },

    concat: {

      text: {
        src: paths.src.shared+'/*.js',
        dest: paths.payloads.shared.js+'/text-public.js'
      }

    },

    uglify: {

      text: {
        src: '<%= concat.text.src %>',
        dest: paths.payloads.shared.js+'/text-public.js'
      }

    },

    stylus: {

      compile: {
        src: paths.stylus.shared+'/*.styl',
        dest: paths.payloads.shared.css+'/text-public.css'
      }

    },

    watch: {

      payload: {
        files: [
          '<%= concat.text.src %>',
          paths.stylus.shared+'/**/*.styl'
        ],
        tasks: 'compile'
      }

    },

    phpunit: {

      options: {
        bin: 'Neatline/vendor/bin/phpunit',
        bootstrap: 'tests/phpunit/bootstrap.php',
        followOutput: true,
        colors: true
      },

      application: {
        dir: 'tests/phpunit'
      }

    },

    jasmine: {

      options: {
        template: 'Neatline/'+nlPaths.jasmine+'/runner.tmpl',
        helpers: [
          'Neatline/'+nlPaths.jasmine+'/payloads/vendor.js',
          paths.jasmine+'/helpers/*.js'
        ]
      },

      neatline: {
        src: [
          'Neatline/'+nlPaths.payloads.shared.js+'/neatline-public.js',
          paths.payloads.shared.js+'/text-public.js'
        ],
        options: {
          specs: paths.jasmine+'/tests/**/*.spec.js'
        }
      }

    },

    compress: {

      dist: {
        options: {
          archive: 'pkg/NeatlineText-'+pkg.version+'.zip'
        },
        dest: 'NeatlineText/',
        src: [

          '**',

          // GIT
          '!.git/**',

          // BOWER
          '!bower.json',
          '!bower_components/**',

          // NPM
          '!package.json',
          '!node_modules/**',

          // GRUNT
          '!.grunt/**',
          '!Gruntfile.js',
          '!paths.json',

          // SYMLINK
          '!Neatline/**',

          // DIST
          '!pkg/**',

          // TESTS
          '!tests/**'

        ]
      }

    }

  });

  // Run tests.
  grunt.registerTask('default', 'test');

  // Build the application.
  grunt.registerTask('build', [
    'clean',
    'symlink',
    'compile'
  ]);

  // Assemble static assets.
  grunt.registerTask('compile', [
    'concat',
    'stylus'
  ]);

  // Assemble/min static assets.
  grunt.registerTask('compile:min', [
    'uglify',
    'stylus'
  ]);

  // Run all tests.
  grunt.registerTask('test', [
    'compile:min',
    'clean:fixtures',
    'phpunit',
    'jasmine'
  ]);

  // Mount Jasmine suite.
  grunt.registerTask('jasmine:server', [
    'jasmine:neatline:build',
    'connect'
  ]);

  // Spawn release package.
  grunt.registerTask('package', [
    'clean:pkg',
    'compile:min',
    'compress'
  ]);

};
