module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: [
        './**/*.js',
        './**/*.json',
        '!./node_modules/**/*'
      ]
    },
    jasmine_node: {
      all: ['spec/']
    }
  });

  grunt.registerTask('default', ['jshint', 'jasmine_node']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');
};
