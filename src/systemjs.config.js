"use strict";

System.config({
	map: {
		app: 'app',
		'@angular/core': 'vendor/@angular/core/bundles/core.umd.js',
		'@angular/common': 'vendor/@angular/common/bundles/common.umd.js',
		'@angular/compiler': 'vendor/@angular/compiler/bundles/compiler.umd.js',
		'@angular/platform-browser': 'vendor/@angular/platform-browser/bundles/platform-browser.umd.js',
		'@angular/platform-browser-dynamic': 'vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
		'@angular/http': 'vendor/@angular/http/bundles/http.umd.js',
		'@angular/router': 'vendor/@angular/router/bundles/router.umd.js',
		'@angular/forms': 'vendor/@angular/forms/bundles/forms.umd.js',
		// other libraries
		'rxjs': 'vendor/rxjs',
		'angular2-in-memory-web-api': 'vendor/angular2-in-memory-web-api',
	},
	packages: {
		app: {
			main: '../main.js',
			defaultExtension: 'js'
		},
		rxjs: {
			defaultExtension: 'js'
		},
		'angular2-in-memory-web-api': {
			main: './index.js',
			defaultExtension: 'js'
		}
	}
});
