(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.VueDevbarDecorators = {}));
}(this, function (exports) { 'use strict';

	console.log('Hello world from TS');
	var A = 4;
	var B = 5;

	exports.A = A;
	exports.B = B;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
