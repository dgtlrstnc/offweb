module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.initConfig({
    concat: {
      build: {
        src: [
          'src/Vendor/Traer.js',

          'src/Config/Constants.js',

          'src/Lib/Util.js',
          'src/Lib/Touch.js',
          'src/Lib/Ticker.js',
          'src/Lib/Game.js',
          'src/Lib/Entity.js',
          'src/Lib/Pool.js',

          'src/Entities/Bg.js',
          'src/Entities/Mask.js',
          'src/Entities/Counter.js',
          'src/Entities/Hook.js',
          'src/Entities/Cable.js',
          'src/Entities/Pointer.js',

          'src/States/Start.js',
          'src/States/Game.js',
          'src/States/Gameover.js',

          'src/Main.js',
        ],
        dest: 'build/build.js',
      },
    },
    uglify: {
      build: {
        files: {
          'build/build.min.js': ['build/build.js']
        }
      }
    },
    copy: {
      build: {
        files: {
          'build/index.html': ['src/build.html'],
          'build/Numbers.svg': ['src/Numbers.svg']
        }
      }
    },
    compress: {
      build: {
        options: {
          archive: 'build/build.zip',
          mode: 'zip'
        },
        files: [
          { src: 'build/build.min.js' },
          { src: 'build/index.html' },
          { src: 'build/Numbers.svg' }
        ]
      }
    }
  });
  grunt.registerTask('build', [
    'concat:build',
    'uglify:build',
    'copy:build',
    'compress:build'
  ]);
};
