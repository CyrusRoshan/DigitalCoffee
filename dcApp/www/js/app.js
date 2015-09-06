var temp;
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

.controller('HomeTabCtrl', function($scope, $interval, $rootScope, $ionicPopup) {

	$interval(fetchData, 100);

	function fetchData(){
		jQuery.ajax({
			url: "https://api.particle.io/v1/devices/400022001447343338333633/leftSensor?access_token=80e4e952b6d84e64327c67f1985844d3e19d5f17",
			type: "GET",
			dataType: "json",
			async: true,
			success: function (data) {
				$rootScope.leftTemp = (JSON.parse(JSON.stringify(data)).result);
			}
		});

		jQuery.ajax({
			url: "https://api.particle.io/v1/devices/400022001447343338333633/rightSensor?access_token=80e4e952b6d84e64327c67f1985844d3e19d5f17",
			type: "GET",
			dataType: "json",
			async: true,
			success: function (data) {
				$rootScope.rightTemp = (JSON.parse(JSON.stringify(data)).result);
			}
		});

		jQuery.ajax({
			url: "https://api.particle.io/v1/devices/400022001447343338333633/alert?access_token=80e4e952b6d84e64327c67f1985844d3e19d5f17",
			type: "GET",
			dataType: "json",
			async: true,
			success: function (data) {
				$rootScope.alertTemp = (JSON.parse(JSON.stringify(data)).result);
			}
		});

		return;
	}

	$rootScope.status = function status(raw){
		if(raw){
			return $rootScope.alertTemp;
		}
		else{
			if($rootScope.alertTemp){
				return "Wake up!";
			}
			else{
				return "You're awake";
			}
		}
	}
});
