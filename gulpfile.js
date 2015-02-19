var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');

gulp.task('browserify', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({transform: 'reactify'}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

gulp.task('cssmin', function () {
  gulp.src('src/**/*.css')
      .pipe(cssmin())
      .pipe(concat('style.css'))
      .pipe(gulp.dest('dist/styles'))
      .pipe(connect.reload());
});

gulp.task('jshint', function() {
  gulp.src('src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
    
  gulp.src('src/js/vendor/**/*.js')
    .pipe(gulp.dest('dist/js/vendor'))
    .pipe(connect.reload());

  gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'))
    .pipe(connect.reload());
});

//Watch for file changes and live reload on the browser
gulp.task('watch', function() {
    connect.server({
        root: 'dist',
        port: '1337',
        livereload: true
    });
    gulp.watch('src/**/*.*', ['build']);
});

gulp.task('build', ['browserify', 'copy', 'cssmin']);

gulp.task('default', ['watch', 'build']);

gulp.task('jshint', ['jshint']);