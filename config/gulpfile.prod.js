// 引入插件
var gulp = require('gulp');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

function prod() {
    gulp.task('clean', function () {
        return gulp.src(['dist/*.min.css', 'dist/*.min.js'], {read: true})
        .pipe(clean());
    });
    gulp.task('cssUglify', function() {
        return gulp.src(['dist/*.css'])
        .pipe(gulp.dest('dist/'))
        .pipe(minifyCSS())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('dist/'));
    });
    gulp.task('jsUglify', function() {
        return gulp.src(['dist/*.js'])
        .pipe(gulp.dest('dist/'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist/'));
    });

    gulp.task('build', function(callback) {
        runSequence(['clean'], ['cssUglify', 'jsUglify'], callback);
    });
}

module.exports = prod;