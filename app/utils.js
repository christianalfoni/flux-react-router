module.exports = {

	removeEmptyInArray: function (array) {
		for (var x = array.length - 1; x >= 0; x--) {
			if (!array[x] && typeof array[x] !== 'number') {
				array.splice(x, 1);
			}
		}
		return array;
	},
	match: function (path, route) {
		if (route === '*') {
			return true;
		}
		var pathArray = path.split('/');
		var routeArray = route.split('/');
		this.removeEmptyInArray(pathArray);
		this.removeEmptyInArray(routeArray);
		return pathArray.length === routeArray.length;

	},
	getParams: function (path, route) {
		var params = {};
		var pathArray = path.split('/');
		var routeArray = route.split('/');
		routeArray.forEach(function (routePart, index) {
			if (routePart.match(/\{.*\}/)) {
				params[routePart.replace(/\{|\}/g, '')] = pathArray[index];
			}
		})
		return params;
	}

};