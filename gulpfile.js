// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var usemin  = require('gulp-usemin');
var rev     = require('gulp-rev');
var jshint  = require('gulp-jshint');
var sass    = require('gulp-sass');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var rename  = require('gulp-rename');
var connect = require('gulp-connect');


// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/assets/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('app/assets/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});


// Concatenate & Minify JS
gulp.task('usemin', function() {
  gulp.src('app/*.html')
      .pipe(usemin({
          js: [uglify(), rev()]
      }))
      .pipe(gulp.dest('dist'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('app/assets/scripts/**/*.js', ['lint', 'usemin']);
    gulp.watch('app/assets/styles/*.scss', ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: './app',
    livereload: true
  });
});

// Default Task
gulp.task('default', ['lint', 'sass', 'usemin', 'watch', 'connect']);