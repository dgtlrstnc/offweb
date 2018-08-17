module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  grunt.initConfig({
    concat: {
      build: {
        src: [
          'src/Vendor/Traer.js',

          'src/Lib/Constants.js',
          'src/Lib/Ticker.js',
          'src/Lib/Game.js',
          'src/Lib/Entity.js',
          'src/Lib/Pool.js',
          'src/Lib/Touch.js',

          'src/Entities/Bg.js',
          'src/Entities/Hook.js',
          'src/Entities/Cable.js',

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
    }
  });
};
