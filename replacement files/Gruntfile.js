module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            src: {
                files: ['**/*.scss', '**/*.php', '**/**/*.scss', ],
                tasks: ['compass']
            },
            options: {
                livereload: true
            },
            js: {
                files: "js/theme.js",
                tasks: ['uglify']
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: 'assets',
                    cssDir: '',
                    imagesDir: 'images',
                    javascriptsDir: 'js',
                    fontsDir: 'assets/fonts',
                    outputStyle: 'compact',
                    relativeAssets: false,
                    noLineComments: true,
                    debugInfo: false
                }
            }
        },

        uglify: {
            build: {
               

                files: {
                     //  add other JS files as needed.
                     // 'js/theme.min.js': ['js/bootstrap.js', 'js/theme.js']
                    'js/theme.min.js': ['js/theme.js']
                }

            }
        },

         // run $ grunt copy from the terminal to copy the files listed below.
         
        copy: {
            main: {

                files: [{
                        expand: true,
                        dest: 'assets/stylesheets',
                        src: ['**'],
                        cwd: 'bower_components/bootstrap-sass/assets/stylesheets'
                    }, {
                        expand: true,
                        dest: 'assets/fonts',
                        src: ['**'],
                        cwd: 'bower_components/bootstrap-sass/assets/fonts'
                    }, {
                        expand: true,
                        dest: 'assets/',
                        src: '_bootstrap.scss',
                        cwd: 'bower_components/bootstrap-sass/assets/stylesheets'
                    }, {
                        expand: true,
                        dest: 'js',
                        src: ['bootstrap.min.js'],
                        cwd: 'bower_components/bootstrap-sass/assets/javascripts'
                    }, {
                        expand: true,
                        dest: 'js',
                        src: ['bootstrap.js'],
                        cwd: 'bower_components/bootstrap-sass/assets/javascripts'
                    }


                ]
            }
        },
        
        // run $ grunt clean from the terminal to remove the files listed below.
 
        clean: {
            build: ['CONTRIBUTING.md',
                'fonts',
                'layouts',
                'bower_components',
                // 'node_modules', 
                '.sass-cache',
                'sass',
                'wp-bootstrap',
                'functions.php.sample',
                'header.php.sample',
                'codesniffer.ruleset.xml',
                '.travis.yml',
                'bower.json'
            ]
        }

    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('default', ['compass', 'watch', 'uglify']);

};
