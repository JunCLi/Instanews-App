const gulp = require('gulp');

const rename = require('gulp-rename'),
      terser = require('gulp-terser'),
      eslint = require('gulp-eslint'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),
      imagemin = require('gulp-imagemin'),
      cache = require('gulp-cache'),
      del = require('del'),
      browserSync = require('browser-sync').create();

// Development Tasks
gulp.task('eslint', () => {
  return gulp.src('./js/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});
      
gulp.task('sass', () => {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
})

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: './app/'
    }
  });
  gulp.watch('./app/scss/**/*.scss', gulp.series(['sass'])).on('change', browserSync.reload);
  gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
  gulp.watch('./app/*.html').on('change', browserSync.reload);
});

// Distribution Tasks
gulp.task('importHtml', () => {
  return gulp.src('./app/*.html')
    .pipe(gulp.dest('./dist/'))
});

gulp.task('minifycss', () => {
  return gulp.src('./app/css/**/*.css')
    .pipe(cssnano())
    // .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('minifyjs', () => {
  return gulp.src('./app/js/**/*.js')
    .pipe(terser())
    // .pipe(rename({extname: '.js'}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('images', () => {
  return gulp.src('./app/images/**/*.+(png|jpg|jpeg|gif)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('./dist/images'))
});

gulp.task('svg', () => {
  return gulp.src('./app/images/**/*.svg')
  .pipe(gulp.dest('./dist/images'))
});

gulp.task('fonts', () => {
  return gulp.src('./app/fonts/**/*')
  .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('clean:dist', () => {
  return del(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

gulp.task('cache:clear', callback => {
  return cache.clearAll(callback)
});

gulp.task('default', gulp.series(['eslint', 'watch']))

gulp.task('build', gulp.series(['clean:dist', gulp.parallel(['importHtml', 'sass', 'minifycss', 'minifyjs', 'images','svg', 'fonts'])]), () => {
  console.log('Building Files');
});