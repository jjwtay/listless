var app = angular.module("listless")

app.controller("User", ["$scope", "$state", "$stateParams", "User", "List", "Item", function($scope, $state, $stateParams, User, List, Item){
	$scope.user = {};
	$scope.currentlist = null;
	
	$scope.newlist = {};
	$scope.newitem  = {};
	User.findOne($stateParams.id, function(user){
		$scope.user = user;
		var rootlist = user.lists.filter(function(entry){
			return entry.url === "/";
		})[0];
		List.findOne(rootlist.id, function(list){
			$scope.currentlist = list;
		});
	});
	
	$scope.createlist = function(){
		if($scope.newlist.url !== null && $scope.newlist.name !== null){
			$scope.newlist.user = $scope.user;
			$scope.newlist.url = $scope.currentlist.url  + $scope.currentlist.name + "/";
			List.create($scope.newlist, function(data){
				$scope.newlist = {};
				$scope.user.lists.push(data);
			});	
		}
	}
	$scope.setList = function(list){
		$scope.currentlist = list;
		console.log($scope.currentlist);
		List.findOne(list.id, function(data){
			$scope.currentlist = data;
		});
	}
	$scope.addItem = function(){
		$scope.newitem.list = $scope.currentlist;
		Item.create($scope.newitem, function(item){
			$scope.currentlist.items.push(item);
			console.log($scope.currentlist);
		});
	}
}]);