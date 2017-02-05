const gulp = require('gulp');

const loadGulpTasks = require('gulp4-tasks-loader');

const config = require('./build.config');
config.rootModule = module;
config.globs = {
	typescript: '**/*.ts',
	typings: '**/*.d.ts',
	specs: '**/*.spec.*',
	javascript: '**/*.js',
	html: '**/*.html',
	scss: '**/*.scss',
	css: '**/*.css'
};



loadGulpTasks({
	              path: './gulp-tasks',
	              arguments: [config],
	              gulp
              });



// TODO tasks for linting and SCC transpile
gulp.task('lint', gulp.parallel('lint:ts'));
gulp.task('transpile', gulp.parallel('transpile:ts'));


gulp.task('default', gulp.series('clean', 'lint', gulp.parallel('transpile', 'copy:build')));


gulp.task('start', gulp.series('default', 'serve', 'watch'));
gulp.task('restart', gulp.series('transpile', 'serve', 'watch'));


// TODO task for bundle and production

