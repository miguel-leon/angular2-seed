const browserSync = require('browser-sync');
const server = browserSync.create('server');
const argv = require('yargs').argv;
const notify = require('gulp-notify');


// TODO has to be used?
const superstatic = require('superstatic');


module.exports.manualRegister = function (gulp, config) {
	server.emitter.on('init', () => gulp.src('.').pipe(notify('Server is running!')));

	gulp.task('serve', done => {
		server.init({
			            server: {
				            baseDir: config.paths.build,
			            },
			            middleware: superstatic(),
			            open: !!(argv.open === undefined || argv.open),
			            port: (argv.port) ? argv.port : 3000
		            });
		done();
	});

	gulp.task('server:reload', done => {
		server.reload();
		done();
	});
};
