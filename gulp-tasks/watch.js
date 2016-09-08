module.exports = function (gulp, config, done) {
	gulp.watch(config.excludes.concat(`${config.paths.src}/${config.globs.typescript}`),
	           gulp.series('transpile:build'));

	gulp.watch(config.excludes.concat(`${config.paths.src}/${config.globs.html}`),
	           gulp.series('copy:build:template', 'server:reload'));

	// TODO falta watch de CSSs

	done();
};

// TODO falta watch de los tests