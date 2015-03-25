'use strict';

var grunt = require('grunt'),
  path = require('path');

var TEST_APP = 'grunt-titanium-app',
  appPath = path.resolve('tmp', TEST_APP);

exports.titanium = {
  should_clean: function(test) {
    test.expect(4);

    test.ok(grunt.file.exists(appPath));
    test.ok(grunt.file.exists(path.join(appPath, 'build')));
    test.ok(!grunt.file.exists(path.join(appPath, 'build', 'iphone')));
    test.ok(!grunt.file.exists(path.join(appPath, 'build', 'android')));

    test.done();
  }
};
