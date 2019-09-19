//requirements
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

//for processing HTML
gulp.task('processHTML', (done) => {
    gulp.src('*.html')
        .pipe(gulp.dest('dist'));
        done();
});
//for processing JS: linting
gulp.task('processJS', (done) => {
    gulp.src('*.js')
        .pipe(jshint({esversion: 8}))
        .pipe(jshint.reporter('default'))
        .pipe(babel({presets: ['env']}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
    done();
});

//task to copy browser.js into dist folder => sort polyfill issue
gulp.task('babelPolyfill', (done) => {
    gulp.src('node_modules/babel-polyfill/browser.js')
        .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
    done();
});

//watch files for changes
gulp.task('watch', () => {
    gulp.watch('*.js', ['processJS']);
    gulp.watch('*.html', ['processHTML']);
});

//run-sequence task
gulp.task('default', (callback) => {
    runSequence(['processHTML', 'processJS', 'babelPolyfill'], 'watch', callback);
});

//live reload
gulp.task('browserSync', () => {
    browserSync.init({
      server: './dist',
      port: 8080,
      ui: {
        port: 8081
      }
    });
  });

//integrate the  browserSync  task into our  watch  task
gulp.task('watch', ['browserSync'], () => {
    gulp.watch('*.js', ['processJS']);
    gulp.watch('*.html', ['processHTML']);
  
    gulp.watch('dist/*.js', browserSync.reload);
    gulp.watch('dist/*.html', browserSync.reload);
});

/*

//requirements
const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');

//for processing HTML
function processHTML(){
    
}


gulp.task('processHTML', gulp.series('processHTML', function(done){
    gulp.src('*.html')
        .pipe(gulp.dest('dist'));
        done();
}));

//for processing JS: linting
gulp.task('processJS', gulp.series('processJS', function(done){
    gulp.src('*.js')
        .pipe(jshint({esversion: 8}))
        .pipe(jshint.reporter('default'))
        .pipe(babel({presets: ['env']}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
    done();
}));

//task to copy browser.js into dist folder => sort polyfill issue
gulp.task('babelPolyfill', gulp.series('babelPolyfill', function(done){
    gulp.src('node_modules/babel-polyfill/browser.js')
        .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
    done();
}));

/*
//run-sequence task
gulp.task('default', (callback) => {
    runSequence(['processHTML', 'processJS', 'babelPolyfill'], callback);
});
*/
/*
gulp.task('main', gulp.series('processHTML', 'processJS', 'babelPolyfill', function (done) {
    done();
}));
*/


/*
gulp.task('processJS', function(done) {
  return gulp.src('*.js')
        .pipe(jshint({esversion: 6}))
        .pipe(jshint.reporter('default'))
        .pipe(babel({presets: ['env']}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
    done();
});

//for processing HTML
gulp.task('processHTML', function(done){
    return gulp.src('*.html')
        .pipe(gulp.dest('dist'));
    done();
});

//task to copy browser.js into dist folder => sort polyfill issue
gulp.task('babelPolyfill', function(done){
    return gulp.src('node_modules/babel-polyfill/browser.js')
        .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
    done();
});

//run-sequence task
gulp.task('default', function(callback){
    return runSequence(['processHTML', 'processJS', 'babelPolyfill'], callback);
});
*/