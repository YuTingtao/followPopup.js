// 引入插件
var gulp = require('gulp');
var connect = require('gulp-connect');

function dev() {
    gulp.task('html', function() {
        return gulp.src('dist/*.html')
        .pipe(connect.reload());
    });

    gulp.task('css', function() {
        return gulp.src(['dist/*.css'])
        .pipe(connect.reload());
    });

    gulp.task('js', function() {
        return gulp.src(['dist/*.js'])
        .pipe(connect.reload());
    });

    gulp.task('default', ['html','css','js'], function() {
        // 启动服务器
        connect.server({
            root: 'dist',
            livereload: true,
            port: 8090
        });
        // 监听文件
        gulp.watch(['dist/*.html'], ['html']);
        gulp.watch(['dist/*.css'], ['css']);
        gulp.watch(['dist/*.js'], ['js']);
    });
}

module.exports = dev;