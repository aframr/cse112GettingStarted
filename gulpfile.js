var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
	apidoc = require('gulp-apidoc'),
	mocha = require('gulp-mocha'),
	jsdoc = require('gulp-jsdoc3');
	nightwatch = require('gulp-nightwatch');

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
gulp.task('nightwatch', function() {
  gulp.src('test/nightwatch.js')
    .pipe(nightwatch({
      configFile: 'test/nightwatch.json',
			cliArgs: {
        env: 'chrome',
        tag: 'sandbox'
      }
    }));
});

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

gulp.task('default', ['lint', 'mocha', 'apidoc','jsdoc']);
