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
	$rootScope.fetchLeft = function fetchLeft(){
		return $.getJSON("https://api.particle.io/v1/devices/400022001447343338333633/leftSensor?access_token=80e4e952b6d84e64327c67f1985844d3e19d5f17", function(data) {
			return data.responseJSON.result;
		});
	}

	$rootScope.fetchRight = function fetchRight(){
		return $.getJSON("https://api.particle.io/v1/devices/400022001447343338333633/rightSensor?access_token=80e4e952b6d84e64327c67f1985844d3e19d5f17", function(data) {
			return data.responseJSON.result;
		});
	}

	$rootScope.fetchAlert = function fetchAlert(){
		return $.getJSON("https://api.particle.io/v1/devices/400022001447343338333633/alert?access_token=80e4e952b6d84e64327c67f1985844d3e19d5f17", function(data) {
			return data.responseJSON.result;
		});
	}

	$rootScope.status = function status(raw){
		if(raw){
			return $rootScope.fetchAlert();
		}
		else{
			if($rootScope.fetchAlert()){
				return "Wake up!";
			}
			else{
				return "You're awake";
			}
		}
	}
});
