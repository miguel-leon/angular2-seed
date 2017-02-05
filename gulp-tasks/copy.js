module.exports.manualRegister = function (gulp, config) {
	const pkg = config.rootModule.require('./package');

	const notSource = [
		`!${config.paths.src}/${config.globs.typescript}`,
		`!${config.paths.src}/${config.globs.scss}`
	];

	gulp.task('copy:build:template', () => {
		return gulp.src(`${config.paths.src}/${config.globs.html}`)
		           .pipe(gulp.dest(config.paths.build));
	});

	// Also copies templates
	gulp.task('copy:build:static', () => {
		return gulp.src([
			                `${config.paths.src}/**`,
			                `${config.paths.static}/**`
		                ].concat(notSource))
		           .pipe(gulp.dest(config.paths.build));
	});

	gulp.task('copy:build:lib', () => {
		const exts = config.buildExts ? `/*.{${config.buildExts}}?(.*)` : '';

		return gulp.src(Object.keys(pkg.dependencies)
		                      .map(lib => `./node_modules/**/${lib}/**${exts}`))
		           .pipe(gulp.dest(`${config.paths.build}/vendor`));

		// TODO how to better select only relevant files?
	});


	gulp.task('copy:build', gulp.parallel('copy:build:static', 'copy:build:lib'));
};
