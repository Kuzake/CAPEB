module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({
                    browsers: ['last 4 versions']
                }),
                require('cssnano')()
            ]
        },
        dist: {
            src: 'release/css/*.css'
        }
    },

    sass: {
       dist: {
         files: [{
           expand: true,
           cwd: 'release/css',
           src: ['style-*.scss'],
           dest: 'release/css',
           ext: '.css'
         }]
       }
     },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'release/css',
          src: ['*.css', '!*.min.css'],
          dest: 'release/css',
          ext: '.min.css'
        }]
      }
    },

    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'index.html': 'release/html/index.html'
        }
      }
    },

    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks: ['uglify'],
        options: {
          livereload: 1337,
        },
      },

      css: {
        files: ['release/css/*.{css,scss}'],
        tasks: ['postcss','sass','cssmin'],
        options: {
          livereload: 1337,
        },
      },

      html: {
          files: ['release/html/*.html'],
          tasks: ['htmlmin'],
          options: {
              livereload: 1337,
          },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify','postcss:dist','sass','cssmin','htmlmin']);

};
