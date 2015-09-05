var app = angular.module('ionicApp', ['ionic', 'ionic.utils'])
var utilities = angular.module('ionic.utils', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('tabs', {
		url: "/tab",
		abstract: true,
		templateUrl: "templates/tabs.html"
	})
		.state('tabs.home', {
		url: "/home",
		views: {
			'home-tab': {
				templateUrl: "templates/home.html",
				controller: 'HomeTabCtrl'
			}
		}
	})
		.state('tabs.analytics', {
		url: "/analytics",
		views: {
			'analytics-tab': {
				templateUrl: "templates/analytics.html"
			}
		}
	});


	$urlRouterProvider.otherwise("/tab/home");

})

.controller('HomeTabCtrl', function($scope, $rootScope, $ionicPopup) {
	$rootScope.fetchData = function fetchData(){
		/*
		$.getJSON("https://api.particle.io/v1/devices/54ff71066672524822431867/fsrFront?access_token=9d50c1974fcd10ee28054c9d2e663ed76016997f", function(data) {
		if (data.result !== NaN){
			return data.result;
		}
	});
	*/
		return "asdf";}

	$rootScope.status = function status(raw){
		if(raw){
			return $rootScope.fetchData();
		}
		else{
			if($rootScope.fetchData() == "asdf"){
				return "test test";
			}
		}
	};
});

//save data from adding classes
utilities.factory('$localstorage', ['$window', function($window) {
	return {
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
			return JSON.parse($window.localStorage[key] || '{}');
		}
	}
}]);
