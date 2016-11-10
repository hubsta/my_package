module.exports = function(grunt) {
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    notify: {
          test: {
            options: {
              title: 'Task Complete',  // optional
              message: 'All Files Compiled', //required
            }
          }
    },
   sass: {
    options: {
                sourceMap: true
            },
        dist: {
            files: {
                'sass/compiled/style.css': 'sass/style.scss'
            }
        }
    },
    uglify: {
      options: {
            mangle: false,
            sourceMap: true
          },
    yourTask : {
       src : 'js/*.js',
       dest : 'js/min/functions.min.js'
     }
  },
    postcss: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
            require('postcss-pxtorem')({}), 
            require('cssnano')({zindex: false, discardEmpty:false }) // minify the result
          ]
        },
        dist: {
          src: 'sass/compiled/style.css',
          dest: 'style.css'
        }
      },
    watch: {
      css: {
        files: ['sass/*.scss', '!sass/compiled/style.css', 'sass/*/*.scss', 'sass/*/*/*.scss'],
        tasks: ['sass', 'postcss', 'notify'],
        options: {
            livereload: false,
            spawn: true
        },
      },
      js: {
        files: ['js/*.js'],
        tasks: ['uglify', 'notify']
      }
    },
    imagemin: {                          // Task
     dynamic: {                         // Another target
      files: [{
        expand: true,                  // Enable dynamic expansion                 // Src matches are relative to this path
        src: ['images/*.{png,jpg,gif}', 'images/banner/*.{png,jpg,gif}'],   // Actual patterns to match
        dest: 'images/dist/'                  // Destination path prefix
      }]
     }
    },
    browserSync : {
      dev : {
        bsFiles : {
          src : [
          '*.css',
          '/js/min/*.min.js',
          '*.php'
          ]
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        options : {
          watchTask: true,
          debugInfoě: true,
          logConnections: true,
          notify: true,
          proxy: "175eagle.local", //change to your domain for local!
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.task.registerTask('minimage','imagemin');
  grunt.registerTask('default',['browserSync', 'watch']);
}