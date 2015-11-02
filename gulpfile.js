var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');	

var config={
	port:3000,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './source/*.html',
		js: './source/*.js',
		build: './build'
	}
};

gulp.task('connect', function(){
	connect.server({
		root:['build'],
		port:config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function(){
	gulp.src('build/index.html')
	.pipe(open('',{url:config.devBaseUrl + ':'+ config.port + '/'}));
	});

gulp.task('html', function(){
	gulp.src(config.paths.html)
	.pipe(gulp.dest(config.paths.build))
	.pipe(connect.reload());
});

gulp.task('js', function(){
	gulp.src(config.paths.js)
	.pipe(gulp.dest(config.paths.build + '/scripts'))
	.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
});

gulp.task('default', ['html', 'js', 'open', 'watch']);