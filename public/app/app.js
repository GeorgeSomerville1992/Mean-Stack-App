angular.module('app',['ngResource','ngRoute']);

angular.module('app').config(function($routeProvider,$locationProvider){
	$locationProvider.html5Mode(true);
	// define routes
	$routeProvider
		.when('/',{templateUrl:'/partials/main/main', controller:'mainCtrl'})
})

// create quick controller to verify app works

angular.module('app').controller('mainCtrl',function($scope){
	$scope.myVar = "hi Angular"
})