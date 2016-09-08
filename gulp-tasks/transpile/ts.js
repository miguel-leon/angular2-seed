const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');

const tsc = require('gulp-typescript');

const browserSync = require('browser-sync');

const tsconfig = require('../../tsconfig');

module.exports = function (gulp, config) {
	return gulp.src([`${config.paths.src}/${config.globs.typescript}`, `typings/${config.globs.typings}`])
	           .pipe(changed(config.paths.build, {extension: '.js'}))
	           .pipe(plumber({errorHandler: notify.onError("Typescript compilation failed !")}))
	           .pipe(sourcemaps.init())
	           .pipe(tsc(tsconfig.compilerOptions))
	           .pipe(sourcemaps.write())
	           .pipe(gulp.dest(config.paths.build))

	           .pipe(browserSync.get('server').stream()); // TODO: debería estar aquí?
};
