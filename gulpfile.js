var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
	apidoc = require('gulp-apidoc'),
	mocha = require('gulp-mocha'),
	jsdoc = require('gulp-jsdoc3');
	nightwatch = require('gulp-nightwatch');
	runSequence = require('run-sequence');
	connect = require('gulp-connect');

/**
* Lint Checker
*/
gulp.task('lint', function () {
   gulp.src('./**/*.js')
      .pipe(jshint())
})

/**
* Run Nightwatch tests
*/
/*
gulp.task("run-e2e-tests-ch", function (cb) {
  runSequence(
    "run-http-server",
    "nightwatch:chrome",
    "kill-http-server",
    cb);
});

gulp.task("run-e2e-tests-ff", function (cb) {
  runSequence(
    "run-http-server",
    "nightwatch:firefox",
    "kill-http-server",
    cb);
});
*/

gulp.task('nightwatch:chrome', function() {
	gulp.src('test/nightwatch_test/*.js')
    .pipe(nightwatch({
      configFile: 'nightwatch_ch.json'
    }));
});

gulp.task('nightwatch:firefox', function() {
	gulp.src('test/nightwatch_test/*.js')
    .pipe(nightwatch({
      configFile: 'nightwatch_ff.json'
    }));
});

/*
gulp.task("run-http-server", function () {
  return connect.server({
    port: 8888
  });
});

gulp.task("kill-http-server", function () {
  return connect.serverClose();
});
*/


/**
* Run Mocha Tests
*/
gulp.task('mocha', () =>
   gulp.src('test/test.js', {read: false})
      .pipe(mocha({reporter: 'nyan'}))
);

/**
* Run documentation generator
*/
gulp.task('apidoc', function(done){
   apidoc({
      src: "routes/",
      dest: "doc/"
   }, done);
});

/**
* JS Documentation
*/
gulp.task('jsdoc', function (cb) {
    gulp.src(['README.md', 'public/js/*.js'], {read: false})
        .pipe(jsdoc(cb));
});

gulp.task('default', ['lint', 'mocha', 'apidoc', 'jsdoc', 'nightwatch:chrome']);
