module.exports = function( grunt ) {
 
  grunt.loadNpmTasks('grunt-contrib-watch');
   
  grunt.initConfig({
     watch: {
        options: {
          livereload: true
        },
        css: {
            files: [ 'css/**/*.css' ],
            tasks: [ 'default' ]
        },
        js: {
            files: [ 'js/**/*.js' ],
            tasks: [ 'default' ],
            options: {
              // Start another live reload server on port 1337
              livereload: 1337
            }
      }
  });
  grunt.registerTask( "default", [ "watch" ] );
};