const mergeStream = require('merge-stream');

module.exports.manualRegister = function (gulp, config) {
	// TODO: usar plugin de copia? chequear merge-stream
	function copy(paths) {
		return Object.keys(paths).reduce((acc, path) => {
			return mergeStream(acc, gulp.src(path).pipe(gulp.dest(paths[path])));
		}, gulp.src('.'));
	}

	gulp.task('copy:build:template', () => {
		return copy({
			            [`${config.paths.src}/${config.globs.html}`]: config.paths.build
		            });
	});

	gulp.task('copy:build:static', () => {
		return copy({
			            // './jspm.config.js': config.paths.build,
			            // [`${config.paths.src}/jspm_packages/**/*`]: `${config.paths.build}/jspm_packages`,
		            });
	});

	gulp.task('copy:build', gulp.parallel('copy:build:template', 'copy:build:static'));
};
