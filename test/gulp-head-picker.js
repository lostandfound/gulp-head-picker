"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var expect = require('chai').expect;

var es = require('event-stream');
var fs = require('fs');
var path = require('path');
var stream = require('stream');

var hp = require('../');

var inputDir = __dirname + '/fixtures/';

function test (input, options, check) {
  return function (done) {
    gulp.src(input)
      // Keep original contents
      .pipe(es.map(function (file, cb) {
        file.originalContents = file.contents;
        cb(null, file);
      }))
      // Execute plugin
      .pipe(hp(options))
      // Test
      .pipe(es.map(check).on('end', done));
  };
}

describe('gulp-head-picker', function() {

  it('should keep contents unchanged if file has no heading', test(inputDir + 'no-heading.html', {}, function (file, cb) {
  	expect(file.toc).to.be.an('array').and.to.have.length(0);
    expect(String(file.originalContents)).to.equal(String(file.contents));
    cb();
  }));

  it('should be able to customize property name', test(inputDir + 'test.html', {property: 'data'}, function (file, cb) {
    expect(file.toc).to.be.undefined;
    expect(file.data).to.be.an('array');
    cb();
  }));

  it ('should raise a plugin error for stream file', function (done) {
    var streamFile = new gutil.File({ contents: new stream.Stream() });
    var res = hp()
      .on('error', function (err) {
        expect(err).to.be.an.instanceOf(gutil.PluginError);
        done();
      })
      .on('end', function () {
        done(new Error('Stream end without error'));
      });
    res.write(streamFile);
    res.end();
  });

  it ('should get null file through', function (done) {
    var nullFile = new gutil.File();
    var res = hp()
      .on('data', function (file) {
        expect(file).to.be.equal(nullFile);
      })
      .on('end', done);
    res.write(nullFile);
    res.end();
  });
});
