var app = angular.module("listless", ['ui.bootstrap','ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/home");	
	
  	$stateProvider
    	.state('home', {
      		url: "/home",
      		templateUrl: "app/home/home.html",
			controller: "Home"
    	})
		.state('user', {
			url: "/user/:id",
			templateUrl: "app/user/user.html",
			controller: "User"
		})
});

