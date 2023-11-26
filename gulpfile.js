const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

// Minify HTML
gulp.task('minify-html', () => {
  return gulp.src('./src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream()); // Aggiunta di browserSync.stream()
});

// Minify and copy CSS
gulp.task('minify-css', () => {
  return gulp.src('./src/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream()); // Aggiunta di browserSync.stream()
});

// Use Babel to process and copy TypeScript files
gulp.task('babel', () => {
  return gulp.src('./src/**/*.ts')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream()); // Aggiunta di browserSync.stream()
});

// Build executing all the previous tasks
gulp.task('build', gulp.parallel('minify-html', 'minify-css', 'babel'));

// Watch for changes and trigger build tasks when a file have been edited by using the development server with "browser-sync"
gulp.task('serve', () => {
  browserSync.init({
    server: './dist'
  });

  // Watch HTML files
  watch('./src/**/*.html', () => gulp.series('minify-html')());

  // Watch CSS files
  watch('./src/**/*.css', () => gulp.series('minify-css')());

  // Watch TypeScript files
  watch('./src/**/*.ts', () => gulp.series('babel')());
});