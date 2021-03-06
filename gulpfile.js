var gulp = require ('gulp');
var concat = require ('gulp-concat');
var uglify = require ('gulp-uglify');
var shell = require ('gulp-shell');
var watch = require ('gulp-watch');
var browser = require ('browser-sync');
var less = require ('gulp-less');
var fallback = require ('connect-history-api-fallback');

gulp.task ('unify', function () {
	gulp.src ('app/**/*.js')
		.pipe (concat ('all.js'))
		.pipe (gulp.dest ('dist/'))
});
gulp.task ('unify-prod', function () {
	gulp.src ('app/**/*.js')
		.pipe (concat ('all.js'))
		.pipe (uglify ())
		.pipe (gulp.dest ('dist/'))
});
gulp.task ('thirdParty', function () {
	gulp.src ([
		'node_modules/jquery/dist/jquery.min.js',
		'thirdParty/jquery-ui.min.js',
		'bower_components/angular/angular.js',
		'thirdParty/ui-router.js',
		'bower_components/firebase/firebase.js',
		'node_modules/angular-ui-sortable/dist/sortable.min.js',
		'node_modules/angular-google-maps/node_modules/lodash/lodash.min.js',
		'node_modules/angular-google-maps/node_modules/angular-simple-logger/dist/angular-simple-logger.min.js',
		'node_modules/angular-google-maps/dist/angular-google-maps.min.js',
		'bower_components/angularfire/dist/angularfire.min.js',
		'node_modules/angular-sanitize/angular-sanitize.min.js',
		'node_modules/ui-router-extras/release/modular/ct-ui-router-extras.core.min.js',
		'node_modules/ui-router-extras/release/modular/ct-ui-router-extras.dsr.min.js',
		'node_modules/toastr/build/toastr.min.js'
	])
		.pipe (concat ('thirdparty.js'))
		.pipe (gulp.dest ('dist/'));
});
gulp.task ('less', function () {
	gulp.src (['styles/**/*.less', 'app/**/*.less'])
		.pipe (less ())
		.pipe (concat ('all.css'))
		.pipe (gulp.dest ('dist/'))
});
gulp.task ('webServer', function () {
	browser ({
		server: {
			baseDir: './',
			middleware: [fallback ()]
		},
		files: ["index.html", "app/**/*.html", "dist/**/*.*"]
	});
});
gulp.task ('watch', function () {
	gulp.watch ('app/**/*.js', ['unify']);
	gulp.watch (['styles/**/*.less', 'app/**/*.less'], ['less']);
});
gulp.task ('deploy', shell.task (['firebase deploy'], {cwd: process.cwd ()}));

gulp.task ('develop', ['thirdParty', 'unify', 'less', 'watch', 'webServer']);
gulp.task ('publish', ['thirdParty', 'less', 'unify-prod', 'deploy']);