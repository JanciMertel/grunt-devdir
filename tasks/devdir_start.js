/*
 * grunt-devdir
 * https://github.com/JanciMertel/grunt-devdir
 *
 * Copyright (c) 2015 JanciMertel
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function (grunt) {

    grunt.registerMultiTask('devdir_start', 'Grunt plugin for switching between specified dev / prod files', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({ });
        if (typeof this.data.disabled !== "undefined" && !this.data.disabled) {
            return true;
        }

        var self = this;
        var fromBase = null;
        var toBase = null;
        var fromBaseExt = null;
        var toBaseExt = null;
        var files = Object.keys(this.data).length;
        var current = 0;

        var done = this.async();

        for (var file in this.data) {
            if (typeof this.data[file].from !== "undefined" && typeof this.data[file].to !== "undefined") {
                fromBase = this.data[file].from.split(".");
                fromBaseExt = fromBase.pop();
                fromBase = fromBase.join('.');
                toBase = this.data[file].to.split(".");
                toBaseExt = toBase.pop();
                toBase = toBase.join('.');
                fs.rename(self.data[file].from, fromBase + "_start." + fromBaseExt, function (err) {
                    if(err)
                    {
                        grunt.log.writeln('').write('Cannot rename the first file\n'.red);
                        done(false);
                    }
                    else
                    {
                        fs.rename(self.data[file].to, self.data[file].from, function (err) {
                            if(err)
                            {
                                grunt.log.writeln('').write('Cannot rename the second file\n'.red);
                                done(false);
                            }
                            else
                            {
                                current++;

                                if(current == files)
                                {
                                    done(true);
                                }
                            }
                        });
                    }
                });
            }
        }
    });

};
