var UI = require('ui');
//var Vector2 = require('vector2');
var Vibe = require('ui/vibe');
var ajax = require('ajax');

var lTrigger = 100;
var rTrigger = 100;
var rawLeft;
var rawRight;
var alertStatus = "Loading...";
//var heartRate = "Loading...";

var URL = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk';



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
	ajax({url: URL, type: 'json'},
		function(json){
			updateData();
			rawLeft = json.weather[0].main;
			rawRight = json.weather[0].main;
			if(rawLeft > lTrigger && rawRight > rTrigger){
				Vibe.vibrate('short');
				alertStatus = "WAKE UP!";
			}
			else{
				alertStatus = "You're awake";	 
			}
		},function(error) {
				Vibe.vibrate('long');
		}
	);
}

function updateData(left, right, status){
	
	window.item(0, 1, {
		title: 'Status:',
		subtitle: alertStatus
	});
	window.item(0, 2, {
		title: 'Values (L, R):',
		subtitle: 'L:' + rawLeft + ' R:' + rawRight
	});
	/*window.item(0, 3, {
		title: 'Heart Rate:',
		subtitle: heartRate
	});*/
}