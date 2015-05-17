var app = angular.module("listless")

app.factory("Item", ["$http", function($http){
	function create(item, callback){
		$http.post("item", item).success(function(data){
			return callback(data);
		});
	}
	
	return {
		create: create	
	}
}]);