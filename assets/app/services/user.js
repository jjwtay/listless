var app = angular.module("listless");

app.factory("User", ["$http", function($http){
	var me = null;
	function create(user, callback){
		delete user["verifyPassword"]
		$http.post("user/create", user).success(function(data){
			return callback(data);
		});
	}
	
	function login(email, password, callback){
		$http.post("user/login", {email : email, password : password}).success(function(data){
			me = data;
			callback(data);
		});
	}
	
	function logout(callback){
		$http.get("user/logout").success(function(data){
			me = null;
			callback(data);
		});
	}
	
	function findMe(callback){
		if(me){
			return callback(me);	
		}
		$http.get("user/findme").success(function(data){
			findOne(data.id, function(user){
				me = user;
				return callback(me);
			});
		});
	}
	
	function findOne(id, callback){
		$http.get("user/" + id).success(function(data){
			return callback(data);	
		});
	}
	return {
		create : create,
		login : login,
		logout : logout,
		findMe : findMe,
		findOne : findOne
	}
}]);