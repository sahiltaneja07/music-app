var gulp = require('gulp');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var del = require('del');
var gp_uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var gp_concat = require('gulp-concat');

gulp.task('serve', function() {
    connect.server({
        root: '',
        port: 3001,
        host: 'localhost',
        fallback: 'index.html'
    });
});

gulp.task('deploy', ['minify'], function() {
    runSequence('deploy-styles', 'deploy-html', 'deploy-misc', 'clean-temp');
});

gulp.task('clean-deploy', function() {
  return del(['deploy/']);
});

gulp.task('uglify', ['clean-deploy'], function() {
    return gulp.src([
        'node_modules/angular/angular.js',
        'node_modules/angular-ui-router/release/angular-ui-router.js',
        'node_modules/ngstorage/ngStorage.min.js',
        'app/services/*.js',
        'app/music-search/*.js',
        'app/artist/*.js',
        './app.js'
    ])
    .pipe(ngAnnotate())
    .pipe(gp_uglify().on('error', function(e) {
        console.log(e);
    }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('concat', ['uglify'], function() {
    return gulp.src(
            [
                'build/js/angular.js',
                'build/js/angular-ui-router.js',
                'build/js/ngStorage.min.js',
                'build/js/app.js',
                'build/js/services.module.js',
                'build/js/utility.service.js',
                'build/js/music-search.service.js',
                'build/js/music-search.module.js',
                'build/js/music-search.config.js',
                'build/js/music-search.component.js',
                'build/js/artist.module.js',
                'build/js/artist.config.js',
                'build/js/artist.component.js'
            ]
        )
        .pipe(gp_concat('all.js'))
        .pipe(gulp.dest("build/"));
});

gulp.task('minify', ['concat']);

gulp.task('deploy-styles', function() {
    return gulp.src([
            "app/stylesheets/*"
        ])
        .pipe(gulp.dest("deploy/app/stylesheets"));
});

gulp.task('deploy-html', function() {
    return gulp.src([
            "app/**/*.html"
        ])
        .pipe(gulp.dest("deploy/app"));
});

gulp.task('deploy-misc', function() {
    return gulp.src([
            "build/all.js",
            "index.html"
        ])
        .pipe(gulp.dest("deploy"));
});

gulp.task('clean-temp', function() {
    return del(['build/']);
});