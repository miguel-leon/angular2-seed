module.exports = function (gulp, config, done) {
	gulp.watch([`${config.paths.src}/${config.globs.typescript}`],
	           gulp.series('transpile'));

	gulp.watch([`${config.paths.src}/${config.globs.html}`],
	           gulp.series('copy:build:template', 'server:reload'));

	// TODO SCSS watchs

	done();
};

// TODO automatic testing watchs