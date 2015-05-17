var app = angular.module("listless");

app.controller("navbar", ["$scope", "$state", "$modal", "User", function($scope, $state, $modal, User){
	/*User.findMe(function(data){
		if(data.username){
			$scope.user = data;	
		}
	});*/
	$scope.register = function(){
		var modalInstance = $modal.open({
			templateUrl: 'app/navbar/register/register.html',
			controller: 'Register',
			//size: size,
			resolve: {
				items: function () {
					return $scope.items;
				}
			}
		});	
	}
	$scope.login = function(){
		User.login($scope.email, $scope.password, function(data){
			$scope.user = data;
			$state.go("user", {id : data.id});
		});
	}
	$scope.logout = function(){
		User.logout(function(data){
			$scope.user = null;
			console.log(data);
			$state.go("home");
		});
	}
}]);