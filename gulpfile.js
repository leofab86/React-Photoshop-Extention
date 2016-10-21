"use strict";

var gulp = require('gulp');
var browserify = require('browserify'); //Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); //Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var eslint = require('gulp-eslint'); //Lint JS files, including JSX

var config = {
	paths: {
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'./src/**/*.css'
		],
		jsx: './src/**/*.jsx',
		dist: './dist',
		mainJs: './src/main.js'
	}
}

var libraries = ['react', 'react-dom', 'fs'];

// gulp.task('js', function () {
// 	browserify(config.paths.mainJs)
// 		.transform(reactify)
// 		.bundle()
// 		.on('error', console.error.bind(console))
// 		.pipe(source('bundle.js'))
// 		.pipe(gulp.dest(config.paths.dist + '/scripts'))
// });

// gulp.task('build:libraries', () => {
// 	var b = browserify();

// 	// require all libs specified in libraries array
// 	libraries.forEach(lib => {
// 		b.require(lib);
// 	});

// 	b.bundle()
// 	.on('error', console.error.bind(console))
// 	.pipe(source('libraries.js'))
// 	.pipe(gulp.dest(config.paths.dist + '/scripts'))
// });

gulp.task('build:app', () => {
	browserify(config.paths.mainJs)
		.external(libraries) // Specify all libraries as external source
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('app.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
});


gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
});

gulp.task('jsx', function() {
	gulp.src(config.paths.jsx)
		.pipe(concat('bundle.jsx'))
		.pipe(gulp.dest(config.paths.dist + '/jsx'))
});

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
});


gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(eslint())
		.pipe(eslint.format())
});

gulp.task('watch', function () {
	gulp.watch(config.paths.js, ['build:app', 'lint'])
	gulp.watch(config.paths.images, ['images'])
	gulp.watch(config.paths.css, ['css'])
	gulp.watch(config.paths.jsx, ['jsx'])
});


gulp.task('default', ['build:app', 'css', 'jsx', 'images', 'lint', 'watch']);