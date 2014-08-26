var utils = require('./utils.js');

var routes = null;

var triggerRoute = function (routeTrigger, params) {
	if (typeof routeTrigger === 'string') {
		if (routes[routeTrigger]) {
			resolveRoute(routes[routeTrigger]);
		} else {
			throw new Error('You are redirecting to a none existing route: ' + routeTrigger);
		}
	} else {
		routeTrigger(params);
	}
};

var resolveRoute = function (path) {
	for (var route in routes) {
		if (routes.hasOwnProperty(route) && utils.match(path, route)) {
			return triggerRoute(routes[route], utils.getParams(path, route));
		}
	}
	throw new Error('No routes match ' + path);
};

var Router = function (routesPassed) {

	routes = routesPassed;

	window.onpopstate = function () {
		resolveRoute(location.pathname);
	};

	return {
		init: function () {
			this.goTo(location.pathname);
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
				this.goTo(path);	
			}.bind(this);
		}
	};

};

module.exports = Router;