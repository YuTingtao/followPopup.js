const gulp = require('gulp')
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer')
const cached = require('gulp-cached')
const cleanCss = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const connect = require('gulp-connect')
const del = require('del')
const fs = require('fs')

const package = JSON.parse(fs.readFileSync('./package.json'))
const topNote =
    '/*\r\n * ' +
    package.pluginName +
    ' ' +
    package.version +
    '\r\n * ' +
    package.github +
    '\r\n * description: ' +
    package.description +
    '\r\n * author: ' +
    package.author +
    '\r\n * license: ' +
    package.license +
    '\r\n */'

gulp.task('css', function () {
    return gulp
        .src('src/css/**/*.css')
        .pipe(
            autoprefixer({
                cascade: false, // 前缀美化
            })
        )
        .pipe(gulp.dest('dist/css'))
        .pipe(
            cleanCss({
                // 压缩CSS
                advanced: false,
                compatibility: 'ie8',
                keepBreaks: false,
                keepSpecialComments: '*',
            })
        )
        .pipe(
            rename({
                suffix: '.min',
            })
        )
        .pipe(gulp.dest('dist/css'))
})

gulp.task('js', function () {
    return (
        gulp
            .src('src/js/**/*.js')
            // .pipe(babel())
            .pipe(gulp.dest('dist/js'))
            .pipe(
                uglify({
                    // 压缩js
                    mangle: true, // 是否混淆变量
                    output: {
                        preamble: topNote,
                    },
                })
            )
            .pipe(
                rename({
                    suffix: '.min',
                })
            )
            .pipe(gulp.dest('dist/js'))
    )
})

gulp.task('img', function () {
    return (
        gulp
            .src('src/img/**/*')
            // .pipe(imagemin()) // 压缩图片
            .pipe(gulp.dest('dist/img'))
    )
})

gulp.task('html', function () {
    return gulp.src('src/*.html').pipe(gulp.dest('dist'))
})

// 清除dist目录
gulp.task('clear', function () {
    return del(['dist/*'])
})

// 本地服务
gulp.task('connect', function () {
    connect.server({
        root: 'src', // 根目录
        port: 8080, // 端口号
        livereload: true, // 热更新
    })
})

// 页面重新加载
gulp.task('reload', function () {
    return gulp.src('src/*.html').pipe(connect.reload())
})

// 监听文件变化
gulp.task('watch', function () {
    gulp.watch('src/*.html', gulp.series('reload'))
    gulp.watch('src/css/**/*.css', gulp.series('reload'))
    gulp.watch('src/js/**/*.js', gulp.series('reload'))
    gulp.watch('src/img/**/*', gulp.series('reload'))
})

gulp.task('serve', gulp.series(gulp.parallel('connect', 'watch')))

gulp.task('build', gulp.series('clear', gulp.parallel('css', 'js', 'img'), 'html'))
