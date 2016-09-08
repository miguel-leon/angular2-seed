// TODO: Subir a github y usar como devDependency de node del proyecto. (package.json)
// TODO: remover dependencia "require-directory" del proyecto cuando esta librería esté aparte.

// TODO allow using both task function and manualRegister for a file

/**
 * @name task
 * @description exported tasks by the user via task files. Pick one of the modes.
 * @type {function|object} - task function to register with additional parameters (first) specified in options.
 * @property {function} nativeTask - task function to register as is.
 * @property {function} manualRegister - function that registers tasks manually.
 * Also passed arguments specified in options.
 */

module.exports = loadGulpTasks;

const DEFAULT_OPTIONS = module.exports.defaults = {
	path: './gulp-tasks',
	separator: ':',
	arguments: [],
	passGulp: true,
	gulp: null
};


const path = require('path');
const requireDirectory = require('require-directory');


function loadGulpTasks(options) {
	options = Object.assign({}, DEFAULT_OPTIONS, options);

	const gulp = options.gulp || require('gulp');

	let args = options.arguments.slice();
	if (options.passGulp) {
		args.unshift(gulp);
	}

	requireDirectory(module.parent || module, options.path, {visit: visitor});


	function visitor(task, taskPath) {
		const taskName = taskNameFromPath(taskPath);

		if (task.manualRegister) {
			task.manualRegister.apply(null, args);
		}
		else {
			gulp.task(taskName, task.nativeTask || bindTaskFunction());
		}

		return taskName;

		function bindTaskFunction() {
			let taskFunction = Function.prototype.bind.apply(task, [{name: taskName}].concat(args));
			// Pass function properties that might be used by gulp 4
			Object.assign(taskFunction, task);
			return taskFunction;
		}
	}

	function taskNameFromPath(taskPath) {
		const relativePath = path.relative(options.path, taskPath);
		const extname = path.extname(taskPath);
		return relativePath.slice(0, -extname.length).split(path.sep).join(options.separator);
	}
}

