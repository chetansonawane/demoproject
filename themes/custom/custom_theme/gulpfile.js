const gulp = require("gulp");
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const scsslint = require('gulp-scss-lint');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const minify = require('gulp-minify');
const connect = require('gulp-connect');
const open = require('gulp-open');
const { series } = require("gulp");
const cache = require('gulp-cache');
const browserSync = require('browser-sync').create();


function scsstocss(){
	return gulp.src('scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer('last 2 version'))
		.pipe(concat('style.min.css'))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./build/css'))
		.pipe(connect.reload());
}

function lintScss(){
	return gulp.src('scss/**/*.scss')
		.pipe(scsslint({
			configFile: '.sass-lint.yml',
		}))
		.pipe(scsslint.format())
		.pipe(scsslint.failOnError());
}
lintScss.description = "Lints all scss files."


function jstask() {
    return gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
	.pipe(concat('scripts.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/js'));
}

//Lint scripts
function lintJs() {
	return gulp.src(['js/**/*.js', "./gulpfile.js"])
	  .pipe(eslint())
	  .pipe(eslint.format())
	  .pipe(eslint.failAfterError());
  }

function style(cb){
	gulp.series(
		lintScss, lintJs
	)(cb);
}

// function connectServer(){
// 	return connect.server({
//         root: 'demo_project_1',
//         port: 3000,
//         livereload: true
//     });
// }

// function openbrowser(){
// 	gulp.src('demo_project_1')
//         .pipe(open({uri: 'http://demo_project_1.local/'}));
// }


// function browsersyncserve(cb){
// 	browserSync.init({
// 		proxy: "demo_project_1.local",
		
		
// 		// server:{
// 		// 	baseDir: "./demo_project_1"
// 		// }
// 	});
// 	cb();
// }

// function browsersyncreload(cb){
// 	browserSync.reload();
// 	cb();
// }


function cacheclean(done){
	return cache.clearAll(done);
}
function watch(){
	//livereload.listen();
	browserSync.init({
		proxy: "demo_project_1.local",
		
	})
}

// function watchTask(){
// 	gulp.watch(['scss/*.scss', 'js/**/*.js', 'templates/**/*.twig'], series(scsstocss, jstask, browsersyncreload));
// 	//gulp.watch('scss/*.scss', 'templates/**/*.twig', browsersyncreload);
// }


gulp.watch('scss/*.scss', scsstocss).on('change', cacheclean);
gulp.watch('templates/**/*.twig').on('change', cacheclean);
gulp.watch('scss/*.scss', scsstocss).on('change', browserSync.reload);
gulp.watch('js/**/*.js', jstask).on('change', browserSync.reload);
gulp.watch('templates/**/*.twig').on('change', browserSync.reload);


// gulp.watch(['./build/css/*.css', './build/js/*.js'], function (files){
// 	livereload.changed(files)
// });

// exports.default = series(
// 	scsstocss,
// 	jstask,
// 	browsersyncserve,
// 	watchTask
// );
exports.scsstocss = scsstocss;
exports.lintScss = lintScss;
exports.jstask = jstask;
exports.lintJs = lintJs;
exports.style = style;
exports.cacheclean = cacheclean;
exports.watch = watch;


//   gulp.task('sass', function () {
// 	gulp.src('scss/*.scss')
// 	  .pipe(sourcemaps.init())
// 		  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
// 		  .pipe(autoprefixer('last 2 version'))
// 	  .pipe(sourcemaps.write('./'))
// 	  .pipe(gulp.dest('css'));
//   });
// Watch Task


// gulp.task('watch', function() {
// 	livereload.listen();

// 	gulp.watch('app/scss/*.scss', gulp.series('sass'));
// 	gulp.watch(['css/*.css', 'js/*.js'], function (files){
//         livereload.changed(files)
//     });
// });

// gulp.task('default', gulp.series('sass', 'watch'));


