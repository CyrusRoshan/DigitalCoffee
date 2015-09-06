var UI = require('ui');
//var Vector2 = require('vector2');
var Vibe = require('ui/vibe');
var ajax = require('ajax');

var rawLeft;
var rawRight;
var alertStatus = "Loading...";
//var heartRate = "Loading...";

var leftSensorURL = 'https://api.particle.io/v1/devices/400022001447343338333633/leftSensor?access_token=80e4e952b6d84e64327c67f1985844d3e19d5f17';
var rightSensorURL = 'https://api.particle.io/v1/devices/400022001447343338333633/rightSensor?access_token=80e4e952b6d84e64327c67f1985844d3e19d5f17';
var alertURL = 'https://api.particle.io/v1/devices/400022001447343338333633/alert?access_token=80e4e952b6d84e64327c67f1985844d3e19d5f17';



var window = new UI.Menu({
	sections: [{
		items: [{
			title: 'Digital Coffee',
			icon: 'images/logoMini.png',
			subtitle: 'You\'ll stay awake!'
		}, {
			title: 'Status:',
			subtitle: 'Loading...'
		}, {
			title: 'Values (L, R):',
			subtitle: 'Loading...'
		}, /*{
			title: 'Heart Rate:',
			subtitle: 'Loading...'
		}*/]
	}]
});

window.show();

setInterval(refreshData, 500);

function refreshData(){
	ajax({url: leftSensorURL, type: 'json'},
		function(json){
			rawLeft = json.result;
		}
	);
	ajax({url: rightSensorURL, type: 'json'},
		function(json){
			rawRight = json.result;
		}
	);
	ajax({url: alertURL, type: 'json'},
		function(json){
			if(json.result){
				alertStatus = "WAKE UP!";
				Vibe.vibrate('short');
			}
			else{
				alertStatus = "You're awake";	 
			}
		}
	);

	updateData(rawLeft, rawRight, alertStatus);
}

function updateData(left, right, status){
	
	window.item(0, 1, {
		title: 'Status:',
		subtitle: status
	});
	window.item(0, 2, {
		title: 'Values (L, R):',
		subtitle: 'L:' + left + ' R:' + right
	});
	/*window.item(0, 3, {
		title: 'Heart Rate:',
		subtitle: heartRate
	});*/
}