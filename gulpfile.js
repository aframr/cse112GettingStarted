var gulp = require('gulp'),
   jshint = require('gulp-jshint'),
    apidoc = require('gulp-apidoc'),
    mocha = require('gulp-mocha'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglifyjs = require('uglify-js'),
    cleanCSS = require('gulp-clean-css'),
    minifier = require('gulp-uglify/minifier');
    jsdoc = require('gulp-jsdoc3');
    eslint = require('gulp-eslint');
    istanbul = require('gulp-istanbul');
    reporter = require('gulp-codeclimate-reporter');
    nightwatch = require('gulp-nightwatch');
    runSequence = require('run-sequence');
    connect = require('gulp-connect');
    pump = require('pump');
	

/**
* Lint Checker
*/
// gulp.task('lint', function () {
//    gulp.src('./**/*.js')
//       .pipe(jshint())
// })
gulp.task('lint', () => {
	// TODO: src should be ./**/*.js to cover all .js files
	return gulp.src(['public/js/*.js','!node_modules/**', '!doc/**', '!docs/**'])
	// eslint() attaches the lint output to the "eslint" property 
	// of the file object so it can be used by other modules. 
	.pipe(eslint())
	// eslint.format() outputs the lint results to the console. 
	// Alternatively use eslint.formatEach() (see Docs). 
	.pipe(eslint.format())
	// To have the process exit with an error code (1) on 
	// lint error, return the stream and pipe to failAfterError last.
	.pipe(eslint.failAfterError());
	});

gulp.task('test', function () {
	return gulp.src(['public/js/*.js', '!node_modules/**', '!doc/**', '!docs/**'])
	.pipe(istanbul({includeUntested: true}))
	.pipe(istanbul.hookRequire())
	.on('finish', function () {
		gulp.src('test/test.js')
		.pipe(mocha({reporter: 'nyan'}))
		.pipe(istanbul.writeReports());
	});
});

gulp.task('codeclimate', function() {
	return gulp.src(['./coverage/lcov.info'], {read: false})
	.pipe(reporter({ token: '9cc28fc7555a2ac1c50d2ffd73cc421ab1cccab9bcc19558f4b1ae800f41c988' })) ;
});

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

/**
* Uglify
*/ 
gulp.task('compress', function (cb) {
   var options = {

   };
  pump([
    gulp.src('public/js/date_scripts.js'),
    concat('scripts.js'),
    gulp.dest('public/dist/js'),
	 rename('scripts.min.js'),
    minifier(options, uglifyjs),
	 gulp.dest('public/dist/js')
    ],
    cb
  );  
  
});

/**
 * Clean css
 */
gulp.task('minify-css', function() {
  return gulp.src('public/stylesheets/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/dist/css/'));
});
gulp.task('default', ['lint', 'test', 'codeclimate', 'apidoc', 'jsdoc', 'compress', 'minify-css']);
