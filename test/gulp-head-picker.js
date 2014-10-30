"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
//var expect = require('chai').expect;

var es = require('event-stream');
var fs = require('fs');
var path = require('path');
var stream = require('stream');

var hp = require('../');

var input = __dirname + '/fixtures/*.html';

gulp.src(input)
.pipe(hp({}))
.pipe(debug({verbose: true}))