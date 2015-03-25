/*
 * grunt-titanium
 * https://github.com/tonylukasavage/grunt-titanium
 *
 * Copyright (c) 2014 Tony Lukasavage
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash'),
  async = require('async'),
  child_process = require('child_process'),
  exec = child_process.exec,
  path = require('path'),
  spawn = child_process.spawn;

var GLOBAL_FLAGS = {
  noBanner: true,
  noProgressBars: true,
  noPrompt: true,
  args: []
};

module.exports = function(grunt) {

  grunt.registerMultiTask('titanium', 'grunt plugin for titanium CLI', function() {

    var TITANIUM = process.env.GRUNT_TITANIUM_TEST ? path.resolve('node_modules', '.bin', 'titanium') :
      path.resolve('node_modules', 'grunt-titanium', 'node_modules', '.bin', 'titanium');

    var command = this.options().command || 'build',
      done = this.async(),
      extraArgs = [],
      options;

    // set default options based on command
    switch (command) {
      case 'build':
        options = this.options(_.extend({
          logLevel: 'info',
          platform: process.platform === 'darwin' ? 'ios' : 'android',
          projectDir: '.'
        }, GLOBAL_FLAGS));
        break;
      case 'create':
        options = this.options(_.extend({
          name: 'tmp',
          id: 'com.grunttitanium.tmp',
          workspaceDir: '.',
          platforms: 'android,blackberry,ios,ipad,iphone,mobileweb',
          quiet: true
        }, GLOBAL_FLAGS));

        // make sure options.platforms is a string
        if (_.isArray(options.platforms)) {
          options.platforms = options.platforms.join(',');
        }
        break;
      default:
        options = this.options(GLOBAL_FLAGS);
        break;
    }

    extraArgs = options.args.slice(0);
    delete options.args;
    delete options.command;


    async.series([

      // make sure the user is logged in
      function(callback) {
        exec(TITANIUM + ' status -o json', function(err, stdout, stderr) {
          if (err) { return callback(err); }
          if (!JSON.parse(stdout).loggedIn) {
            grunt.fail.fatal([
              'You must be logged in to use grunt-titanium. Use `titanium login`.'
            ]);
          }
          return callback();
        });
      },

      // execute the titanium command
      function(callback) {
        var args = [];

        // create the list of command arguments
        Object.keys(options).forEach(function(key) {
          var value = options[key],
            isBool = _.isBoolean(value);
          if (!isBool || (isBool && !!value)) {
            args.push(camelCaseToDash(key));
          }
          if (!isBool) { args.push(value); }
        });
        args.unshift(command);

        // add non-option, non-flag arguments
        args = args.concat(extraArgs);

        // spawn command and output
        grunt.log.writeln(TITANIUM + ' ' + args.join(' '));
        var ti = spawn(TITANIUM, args);
        ti.stdout.on('data', function(data) {
          process.stdout.write(data);
        });
        ti.stderr.on('data', function(data) {
          process.stdout.write(data);
        });
        ti.on('close', function(code) {
          if (command !== 'build' || options.buildOnly) {
            grunt.log[code ? 'error' : 'ok']('titanium ' + command + ' ' + (code ? 'failed' : 'complete') + '.');
          }
          return callback(code);
        });
      }

    ], function(err, result) {
      done(err);
    });

  });

};

function camelCaseToDash(str) {
  if (typeof str !== 'string') { return str; }
  return '--' + str.replace(/([A-Z])/g, function(m) { return '-' + m.toLowerCase(); });
}
