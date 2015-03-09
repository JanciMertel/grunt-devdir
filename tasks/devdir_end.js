/*
 * grunt-devdir
 * https://github.com/JanciMertel/grunt-devdir
 *
 * Copyright (c) 2015 JanciMertel
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function(grunt) {

    grunt.registerMultiTask('devdir_end', 'Grunt plugin for switching between specified dev / prod files', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });
        if(typeof this.data.disabled !== "undefined" && !this.data.disabled)
        {
            return;
        }
        var fromBase = null;
        var toBase = null;
        var fromBaseExt = null;
        var toBaseExt = null;
        for(var file in this.data)
        {
            if(typeof this.data[file].from !== "undefined" && typeof this.data[file].to !== "undefined")
            {
                fromBase = this.data[file].from.split(".");
                fromBaseExt = fromBase.pop();
                fromBase = fromBase.join('.');
                toBase = this.data[file].to.split(".");
                toBaseExt = toBase.pop();
                toBase = toBase.join('.');
                fs.rename(this.data[file].from, this.data[file].to, function (err) {});
                fs.rename(fromBase + "_start." + fromBaseExt, this.data[file].from, function (err) {});
            }
        }
    });

};
