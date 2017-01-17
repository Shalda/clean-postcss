'use strict';

var gulp              = require('gulp'),
    watch             = require('gulp-watch'),
    sourcemaps        = require('gulp-sourcemaps'),
    browserSync       = require('browser-sync').create(),
    mainBowerFiles    = require('main-bower-files'),
    imagemin          = require('gulp-imagemin'),
    fontmin           = require('gulp-fontmin'),
    flatten           = require('gulp-flatten'),
    postcss           = require('gulp-postcss'),
    cssnano           = require('cssnano'),
    cssnext           = require('postcss-cssnext'),
    cssshort          = require('postcss-short'),
    atImport          = require("postcss-import");

gulp.task('css', function() {
    var processors = [
    atImport,
        cssnano(),
        cssshort,
        cssnext(),
        
    ];
    return gulp.src('./frontend/stylesheets/style.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});


//browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./frontend/stylesheets/**/*.css', ['css']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});
//font: watch/build/
gulp.task('font:watch', ['font:build'], function() {
    return watch('./frontend/fonts/**/*.ttf', function() {
        gulp.src('./frontend/fonts/**/*.ttf')
            .pipe(fontmin())
            .pipe(gulp.dest('./public/fonts'));
    });
});

gulp.task('font:build', function() {
    gulp.src('./frontend/fonts/**/*.ttf')
        .pipe(fontmin())
        .pipe(gulp.dest('./public/fonts'));
});
//image: watch/build/min
gulp.task('image:watch', ['image:build'], function() {
    return watch(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'], function() {
        gulp.src(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'])
            .pipe(imagemin())
            .pipe(gulp.dest('./public/images'));
    });
});

gulp.task('image:build', function() {
    gulp.src(['./frontend/images/**/*.jpg', './frontend/images/**/*.png', './frontend/images/**/*.svg', './frontend/images/**/*.gif'])
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'));
});
//js: watch/build
gulp.task('js:watch', ['js:build'], function() {
    return watch('./frontend/javascript/**/*.js', function() {
        gulp.src('./frontend/javascript/**/*.js')
            .pipe(gulp.dest('./public/js'));
    });
});

gulp.task('js:build', function() {
    gulp.src('./frontend/javascript/**/*.js')
        .pipe(gulp.dest('./public/js'));
});
//bower files: CSS
gulp.task('main-css', function() {
    return gulp.src(mainBowerFiles('**/*.css'))
        .pipe(gulp.dest('./public/css'));
});
//bower files: JS
gulp.task('main-js', function() {
    return gulp.src(mainBowerFiles('**/*.js'))
        .pipe(gulp.dest('./public/js'));
});
gulp.task('default', [
    'browser-sync',
    'css',
    'font:watch',
    'image:watch',
    'main-css',
    'main-js',
    'js:watch'
]);
