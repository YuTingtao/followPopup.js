// 引入插件
var gulp = require('gulp');
var dev = require('./config/gulpfile.dev.js');
var prod = require('./config/gulpfile.prod.js');

// 启动开发环境：gulp dev
dev();

// 启动生产环境：gulp build 
prod();
