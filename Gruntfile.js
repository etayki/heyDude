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
            tasks: [ 'default' ]
        },
        watch: {
            files: [ 'index.php', 'styles.css' ],
            tasks: [ 'default' ]
        }
      }
  });
  grunt.registerTask( "default", [ "watch" ] );
};