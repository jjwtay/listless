var app = angular.module("listless");

app.controller("Register", ["$scope", "$modalInstance", "User", "$state", function($scope, $modalInstance, User, $state){
	$scope.user = {};
	$scope.cancel = function(){
		$modalInstance.dismiss('cancel');	
	}
	$scope.submitForm = function(isValid){
		if(isValid){
			User.create($scope.user, function(data){
				$scope.user = {};
				$modalInstance.dismiss('submitted');
				$state.go("user", {id: data.id});				
			});
		}
	}
}]);