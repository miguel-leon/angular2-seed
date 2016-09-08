const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const tslint = require('gulp-tslint');

module.exports = function (gulp, config) {
	return gulp.src([`${config.paths.src}/${config.globs.typescript}`], {since: gulp.lastRun(this.name)})
	           .pipe(plumber({errorHandler: notify.onError("Typescript linting failed !")}))
	           .pipe(tslint({formatter: 'prose'}))
	           .pipe(tslint.report());
};
