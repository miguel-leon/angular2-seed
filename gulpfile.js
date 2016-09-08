const gulp = require('gulp');

const loadGulpTasks = require('./lib/gulp4-tasks-loader');

const config = require('./build.config');
config.globs = {
	typescript: '**/*.ts',
	typings: '**/*.d.ts',
	specs: '**/*.spec.js',
	html: '**/*.html',
	scss: '**/*.scss'
};
config.excludes = [];


// TODO usar gulp-load-plugins para evitar repetir require en cada archivo
loadGulpTasks({
	              path: './gulp-tasks',
	              arguments: [config],
	              gulp
              });



// TODO faltan tareas de lint y transpile de SCSS para los estilos
gulp.task('lint', gulp.parallel('lint:ts'));
gulp.task('transpile', gulp.parallel('transpile:ts'));


gulp.task('default', gulp.series('clean', 'lint', gulp.parallel('transpile', 'copy:build')));


gulp.task('start', gulp.series('default', 'serve', 'watch'));



// TODO... por último, tarea para hacer bundle de producción.