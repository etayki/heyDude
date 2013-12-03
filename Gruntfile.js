module.exports = function( grunt ) {
 
  grunt.loadNpmTasks('grunt-contrib-watch');
   
  grunt.initConfig({
     watch: {
        options: {
        },
        css: {
            files: [ 'css/**/*.css' ],
            tasks: [ 'default' ]
        },
        js: {
            files: [ 'js/**/*.js' ],
            tasks: [ 'default' ]
        }
      }
  });
  grunt.registerTask( "default", [ "watch" ] );
};