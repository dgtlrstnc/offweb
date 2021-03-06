module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.initConfig({
    concat: {
      build: {
        src: [
          'src/start.js',

          'src/Vendor/Traer.js',

          'src/Config/Constants.js',

          'src/Lib/Util.js',
          'src/Lib/Touch.js',
          'src/Lib/Ticker.js',
          'src/Lib/Game.js',
          'src/Lib/Entity.js',
          'src/Lib/Pool.js',

          'src/Entities/TextBox.js',
          'src/Entities/Bg.js',
          'src/Entities/Sprite.js',
          'src/Entities/Squares.js',
          // 'src/Entities/Logos.js',
          'src/Entities/Btn.js',
          'src/Entities/BtnOutline.js',
          // 'src/Entities/Mask.js',
          'src/Entities/Counter.js',
          'src/Entities/Timer.js',
          'src/Entities/Alert.js',
          // 'src/Entities/Guides.js',
          'src/Entities/Hook.js',
          'src/Entities/Cable.js',
          'src/Entities/Radial.js',
          // 'src/Entities/Pointer.js',
          'src/Entities/TutorialCables.js',
          // 'src/Entities/GlitchPass.js',

          'src/Logic/Logic.js',

          'src/States/Start.js',
          'src/States/Intro.js',
          'src/States/Tutorial.js',
          'src/States/Game.js',
          'src/States/Gameover.js',

          'src/Main.js',

          'src/end.js'
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
          'build/index.html': ['src/build.html']
          // 'build/Sprite.svg': ['src/Sprite.svg']
        }
      }
    },
    compress: {
      build: {
        options: {
          archive: 'build/build.zip',
          mode: 'zip',
          level: 8
        },
        files: [
          { src: 'build/build.min.js' },
          { src: 'build/index.html' }
          // { src: 'build/Sprite.svg' }
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
