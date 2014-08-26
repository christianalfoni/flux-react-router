var utils = require('./utils.js');

var routes = [];

var triggerRoute = function (routeTrigger, params) {
	if (typeof routeTrigger === 'string') {
		resolveRoute(routeTrigger);
	} else {
		routeTrigger(params);
	}
};

var resolveRoute = function (path) {
	for (var x = 0; x < routes.length; x++) {
		var route = routes[x];
		if (utils.match(path, route.path)) {
			return triggerRoute(route.callback, utils.getParams(path, route.path));
		}
	}
	throw new Error('No routes match ' + path);
};

var Router = {

	init: function () {

		window.onpopstate = function () {
			resolveRoute(location.pathname);
		};
		Router.goTo(location.pathname);

	},
	createRoute: function (path, callback) {
		if (arguments.length !== 2) {
			throw new Error('You are passing the wrong arguments to createRoute()');
		}
		routes.push({
			path: path,
			callback: callback
		});
	},
	goTo: function (path) {
		var onReady = function () {
			if (document.readyState === 'complete') {
				if (path === location.pathname) {
					window.history.replaceState({}, '', path);
				} else {
					window.history.pushState({}, '', path);
				}
				resolveRoute(path);	
			}
		};

		if (document.readyState !== 'complete') {
			document.onreadystatechange = onReady;
		} else {
			onReady();
		}
	},
	deferTo: function (path) {
		return function () {
			Router.goTo(path);	
		};
	}

};

module.exports = Router;