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
				templateUrl: "templates/analytics.html",
				controller: 'AnalyticsTabCtrl'
			}
		}
	});


	$urlRouterProvider.otherwise("/tab/home");

})

.controller('HomeTabCtrl', function($scope, $interval, $rootScope, $ionicPopup) {

	$interval(fetchData, 500);

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
})

.controller('AnalyticsTabCtrl', function($scope, $interval, $rootScope, $ionicPopup) {

	/*var chart = $('#chart').epoch({
		type: 'line',
		data: $rootScope.data,
		axes: ['left', 'right', 'bottom']
	});

	$rootScope.data = [
		{
			label: "Left",
			values: [{time: 0, y: 0}, {time: 10, y: 20},]
		},

		{
			label: "Right",
			values: []
		},
	]*/

	//$rootScope.data[0].values.push({time: new Date().getTime(), y: $rootScope.leftTemp});


	var data = [{ label: 'A', values: [] }],
		length = 40,
		nextIndex = length,
		playing = false,
		interval = null;
	for (var i = 0; i < 1; i++) {
		var x = i * 2 * Math.PI / length,
			y = Math.cos(x) + 1,
			time = new Date().getTime();
		data[0].values.push({time: time, y: y});
	}
	var chart = $('#chart').epoch({
		type: 'time.line',
		data: data,
	});
	var pushPoint = function() {
		var x = nextIndex * 2 * Math.PI / length,
			y = Math.cos(x) + 1,
			time = new Date().getTime();
		chart.push([{ time: time, y: $rootScope.leftTemp}]);
		nextIndex++;
	};
	setInterval(pushPoint, 1000);

});
