/*'use strict';*/

import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import livereload  from 'gulp-livereload';
 
var paths = {
  scripts: 'build/js/*.js',
  sass: 'build/sass/*.scss',
  pages: '*.html',
};

gulp.task('pageReload', () => {
  return gulp.src(paths.pages)
    .pipe(livereload());
})

gulp.task('runBabel', () => {
  return gulp.src(paths.scripts)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('assets/js'))
    .pipe(livereload());
});

gulp.task('sass', function() {
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css'))
    .pipe(livereload());
});
 
gulp.task('watch', function() {
  livereload.listen();

  gulp.watch(paths.scripts, ['runBabel']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.pages, ['pageReload']);
});
 
gulp.task('default', ['runBabel', 'sass', 'watch']);