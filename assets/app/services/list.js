var app = angular.module("listless");

app.factory("List", ["$http", function($http){
	function create(newlist, callback){
		$http.post("list", {list : newlist}).success(function(data){
			return callback(data);
		});
	}
	
	function findOne(id, callback){
		$http.get("list/" + id).success(function(data){
			return callback(data);
		});
	}
	
	return {
		create : create,
		findOne: findOne
	}
}]);