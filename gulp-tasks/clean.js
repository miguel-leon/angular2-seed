const del = require('del');

module.exports.manualRegister = function (gulp, config) {
	gulp.task('clean:build', () => del(config.paths.build));

	gulp.task('clean:tmp', () => del(config.paths.temp));

	gulp.task('clean',
	          gulp.parallel('clean:build', 'clean:tmp'));
};