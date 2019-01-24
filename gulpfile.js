const gulp = require('gulp');

const terser = require('terser'),
      rename = require('gulp-rename'),
      eslint = require('eslint'),
      browserSync = require('browser-sync').create();

gulp.task('eslint', () => {
  return gulp.src('./app/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failtAfterError());
});

gulp.task('minifyjs', done => {
  return gulp
    .src('./app/js/**/*.js')
    .pipe(terser())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}); 

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: "./app/"
    }
  });
  gulp.watch('./app/js/**/*.js', gulp.series(['eslint', 'minifyjs']));
  gulp.watch('./*html').on('change', browserSync.reload);
  gulp.watch('');
});

gulp.task('default', gulp.series('watch'));