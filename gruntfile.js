"use strict";

module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-browser-sync");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.initConfig({
        
        browserSync: {
            server: {
                bsFiles: {
                    src: [
                        "*.html",
                        "js/*js"
                    ]
                },
                options: {
                    server: ".",
                    watchTask: true,
                    notify: false,
                    open: true,
                    cors: true,
                    ui: false
                }
            }
        },

        watch: {
            style: {
                files: ["less/**/*.less"],
                tasks: ["less", "postcss"]
            }
        }
    });

    grunt.registerTask("serve", ["browserSync", "watch"]);
};