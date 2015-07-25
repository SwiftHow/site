var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

/*
 * Create variables for our project paths so we can change in one place
 */
var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']
};

// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));

});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.src(paths.src)
		.pipe(watch())
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

gulp.task('style', function() {
	gulp.src('public/styles/canary.scss')
		.pipe(sass())
		.pipe(concat('canary.css'))
		.pipe(gulp.dest('public/styles'))
		.pipe(minifyCSS())
		.pipe(rename('canary.min.css'))
		.pipe(gulp.dest('public/styles'));
})

//Watch task
gulp.task('default', function() {
	gulp.watch('public/styles/**/*.scss', ['style']);
});
