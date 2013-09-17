
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
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-symbolic-link');
  grunt.loadNpmTasks('grunt-shell');

  var pkg     = grunt.file.readJSON('./package.json');
  var nlPaths = grunt.file.readJSON('../Neatline/paths.json');
  var paths   = grunt.file.readJSON('./paths.json');

  grunt.initConfig({

    shell: {
      options: {
        stdout: true
      },
      phpunit: {
        command: 'phpunit --color',
        options: {
          execOptions: {
            cwd: './tests/phpunit'
          }
        }
      }
    },

    symlink: {
      neatline: {
        link: './Neatline',
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
      pkg: './pkg'
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
        files: {
          './views/shared/css/payloads/text-public.css':
            paths.stylus.shared+'/*.styl'
        }
      }
    },

    watch: {
      payload: {
        files: [
          '<%= concat.text.src %>',
          paths.stylus.shared+'/**/*.styl'
        ],
        tasks: ['compile']
      }
    },

    jasmine: {

      options: {
        helpers: [
          './Neatline/'+nlPaths.vendor.js.jasmine_jquery,
          './Neatline/'+nlPaths.vendor.js.sinon,
          './Neatline/'+nlPaths.jasmine+'/helpers/*.js',
          './Neatline/'+nlPaths.jasmine+'/assertions/*.js',
          paths.jasmine+'/helpers/*.js'
        ]
      },

      neatline: {
        src: [
          './Neatline/'+nlPaths.payloads.shared.js+'/neatline-public.js',
          paths.payloads.shared.js+'/text-public.js'
        ],
        options: {
          specs: paths.jasmine+'/unit/**/*.spec.js'
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
          '!.git/**',
          '!package.json',
          '!node_modules/**',
          '!.grunt/**',
          '!Gruntfile.js',
          '!paths.json',
          '!Neatline/**',
          '!pkg/**',
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
    'clean:fixtures',
    'shell:phpunit',
    'jasmine'
  ]);

  // Run PHPUnit.
  grunt.registerTask('phpunit', 'shell:phpunit');

  // Mount Jasmine suite.
  grunt.registerTask('jasmine:server', [
    'jasmine:neatline:build',
    'connect'
  ]);

  // Spawn release package.
  grunt.registerTask('package', [
    'compile:min',
    'clean:pkg',
    'compress'
  ]);

};
