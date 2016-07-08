var $ = {};

var gulp = require('gulp');

$.useref = require('gulp-useref');
$.rev = require('gulp-rev');
$.if = require('gulp-if');
$.uglify = require('gulp-uglify');
$.minifyCss = require('gulp-minify-css');
$.minifyHtml = require('gulp-minify-html');
$.revReplace = require('gulp-rev-replace');
$.del = require('del');

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe($.useref())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe($.if('*.js', $.rev()))
    .pipe($.if('*.css', $.rev()))
    .pipe($.if('*.html', $.minifyHtml({ empty: true })))
    .pipe($.revReplace())
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function (done) {
  return $.del(['build/'], done);
});

gulp.task('video-swf', function () {
  return gulp.src('node_modules/video.js/dist/video-js.swf')
    .pipe(gulp.dest('build'));
});

gulp.task('fonts', function () {
  return gulp.src('node_modules/video.js/dist/font/*')
    .pipe(gulp.dest('build/font'));
});

// gulp 4.0
gulp.task('build', gulp.parallel('html', 'video-swf', 'fonts'));

gulp.task('default', gulp.series('clean', 'build'));
