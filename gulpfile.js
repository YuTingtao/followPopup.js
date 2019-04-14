// 引入插件
var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var less = require("gulp-less");
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imageMin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');

// 启动Web服务器 localhost:8080
gulp.task('connect', function() {
	connect.server({
		root: 'src',
		livereload: true,
		port: 8080
	});
});

// 监听html,css,js,font文件是否修改
gulp.task('watch', function() {
	gulp.watch(['src/*.html'], ['html']);
	gulp.watch(['src/css/**/*.css'], ['css']);
	gulp.watch(['src/js/**/*.js'], ['js']);
	gulp.watch(['src/images/**'], ['image']);
	gulp.watch(['src/fonts/**'], ['font']);
});

gulp.task('compileLess', function() {
	gulp.src(['src/less/**/*.less', '!src/less/base.less'])
		.pipe(less())
		.pipe(gulp.dest('src/css'));
});
gulp.task('watchLess', function() {
	gulp.watch('src/**/*.less',['compileLess']);
});

gulp.task('html', function() {
	gulp.src('src/**/*.html')
		.pipe(connect.reload())
		.pipe(gulp.dest('dist/'));
});

var isMincss = function(file){
	if(file.path.endsWith('.min.css')){
		return false;
	}
	return true;
}
gulp.task('css', function() {
	gulp.src(['src/css/**/*.css'])
		.pipe(connect.reload())
		.pipe(gulp.dest('dist/css/'))
		.pipe(gulpif(isMincss, minifyCSS()))
		.pipe(gulpif(isMincss, rename({extname: '.min.css'})))
		.pipe(gulp.dest('dist/css/'));
});

var isMinjs = function(file){
	if(file.path.endsWith('.min.js')){
		return false;
	}
	return true;
}
gulp.task('js', function() {
	gulp.src(['src/js/**/*.js'])
		.pipe(connect.reload())
		.pipe(gulp.dest('dist/js/'))
		.pipe(gulpif(isMinjs, uglify()))
		.pipe(gulpif(isMinjs, rename({extname: '.min.js'})))
		.pipe(gulp.dest('dist/js/'));
});

gulp.task('image', function() {
	gulp.src('src/images/**')
		.pipe(cache(imageMin({
			optimizationLevel: 5, // 优化等级: 0-7(默认:3)
			progressive: true,    // 无损压缩jpg图片
			interlaced: true,     // 隔行扫描gif进行渲染
			multipass: true,      // 多次优化svg直到完全优化
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/images/'));
});

gulp.task('font', function() {
	gulp.src('src/fonts/**')
		.pipe(connect.reload())
		.pipe(gulp.dest('dist/fonts/'));
});


// 默认Task
gulp.task('default', ['connect','watch','html','compileLess','watchLess','css','js','image','font']);
