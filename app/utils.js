var isParam = function (part) {
	return part.match(/\{.*\}/);
}

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
		if (pathArray.length !== routeArray.length) {
			return false;
		}
		for (var x = 0; x < pathArray.length; x++) {
			if (pathArray[x] !== routeArray[x] && !isParam(routeArray[x])) {
				return false;
			}
		}	
		return true;
	},
	getParams: function (path, route) {
		var params = {};
		var pathArray = path.split('/');
		var routeArray = route.split('/');
		routeArray.forEach(function (routePart, index) {
			if (isParam(routePart)) {
				params[routePart.replace(/\{|\}/g, '')] = pathArray[index];
			}
		})
		return params;
	}

};