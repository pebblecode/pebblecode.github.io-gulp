"use strict";

var gulp = require('gulp'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    connectLivereload = require('connect-livereload'),
    gulpLivereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    fileInclude = require('gulp-file-include');

var src = {
  html: 'src/**/*.html',
  index: 'src/index.html',
  js: 'src/js/*.js',
  sass: 'src/sass/**/*.scss',
  images: 'src/img/**/*',
  fonts: 'src/fonts/**/*'
}

var site = {
  root: 'site/',
  js: 'site/js/',
  css: 'site/css/',
  images: 'site/img/',
  fonts: 'site/fonts/'
}

var localPort = 4000,
       lrPort = 35729;

gulp.task('server', function(){
  var server = connect();

  server.use(connectLivereload({port: lrPort}));
  server.use(serveStatic(site.root));
  server.listen(localPort);

  console.log("\nlocal server running at http://localhost:" + localPort + "/\n");
});

gulp.task('sass', function(){
  gulp.src(src.sass)
    .pipe(sass({
      outputStyle: [ 'compressed' ]
    }).on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest(site.css))
    .pipe(gulpLivereload());
})

gulp.task('js', function(){
  gulp.src(src.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(site.js))
    .pipe(gulpLivereload());
});

gulp.task('html', function(){
  gulp.src(src.index)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(site.root))
    .pipe(gulpLivereload());
});

gulp.task('assets', function(){
  gulp.src(src.images)
    .pipe(gulp.dest(site.images));
  gulp.src(src.fonts)
    .pipe(gulp.dest(site.fonts));
});

gulp.task('watch', function(){
  gulp.watch(src.sass, ['sass']);
  gulp.watch(src.js, ['js']);
  gulp.watch(src.html, ['html']);

  gulpLivereload.listen();
})

gulp.task('default', ['server', 'watch']);
