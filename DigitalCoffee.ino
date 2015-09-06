#include <Wire.h>
/////////////////

int sensorValue1 = 0;
int sensorValue2 = 0;
int motorPin1 = 3;
int motorPin2 = 5;
int button = 4;

int calc1 = 0;
int calc2 = 0;
int change1 = 0;
int change2 = 0;
int changeThreshold = 5;

int changeThreshold1;
int changeThreshold2;

int buttonState = 0;
int duration = 100;
float lastStart = 0;

int buttonPushCounter = 0;
int lastButtonState = 0;

int sensorCalibrateOPEN1;
int sensorCalibrateOPEN2;
int sensorCalibrateCLOSE1;
int sensorCalibrateCLOSE2;

void setup() {
	Wire.begin();
	Serial.begin(9600);
	pinMode(3, OUTPUT);
	pinMode(5, OUTPUT);
	pinMode(button, INPUT);

	while(buttonPushCounter < 2){
		if(buttonPushCounter == 0){
			buttonState = digitalRead(button);
			if (buttonState != lastButtonState){
				if(buttonState == HIGH){
					sensorCalibrateOPEN1 = analogRead(A0);
					sensorCalibrateOPEN2 = analogRead(A1);
					Serial.println("Eyes opened and calibrated.");
					buttonPushCounter++;
					delay(500);

					Serial.println("Sensor 1 open eye value:  ");
					Serial.println(sensorCalibrateOPEN1);
					Serial.println("Sensor 2 open eye value:  ");
					Serial.println(sensorCalibrateOPEN2);
				}
			}
		}
		else if(buttonPushCounter == 1){
			buttonState = digitalRead(button);
			if (buttonState != lastButtonState){
				if(buttonState == HIGH){
					sensorCalibrateCLOSE1 = analogRead(A0);
					sensorCalibrateCLOSE2 = analogRead(A1);
					Serial.println("Eyes closed and calibrated.");
					buttonPushCounter++;
					delay(500);

					Serial.println("Sensor 1 close eye value:  ");
					Serial.println(sensorCalibrateCLOSE1);
					Serial.println("Sensor 2 close eye value:  ");
					Serial.println(sensorCalibrateCLOSE2);
				}
			}
		}
		lastButtonState = buttonState;
	}
	changeThreshold1 = (sensorCalibrateOPEN1 - sensorCalibrateCLOSE1)/2;
	changeThreshold1 = abs(changeThreshold1);
	changeThreshold2 = (sensorCalibrateOPEN2 - sensorCalibrateCLOSE2)/2;
	changeThreshold2 = abs(changeThreshold2);
}


void loop() {
	sensorValue1 = analogRead(A0);
	sensorValue2 = analogRead(A1);
	calc1 = sensorCalibrateOPEN1 - sensorValue1;
	calc2 = sensorCalibrateOPEN2 - sensorValue2;
	change1 = abs(calc1);
	change2 = abs(calc2);

	while (change1 >= changeThreshold1 && change2 >=changeThreshold2){
		digitalWrite(3, HIGH);
		digitalWrite(5, HIGH);
		sensorValue1 = analogRead(A0);
		sensorValue2 = analogRead(A1);
		calc1 = sensorCalibrateOPEN1 - sensorValue1;
		calc2 = sensorCalibrateOPEN2 - sensorValue2;
		change1 = abs(calc1);
		change2 = abs(calc2);



		Wire.beginTransmission(100);
		Wire.write(sensorValue1);
		Wire.write(sensorValue2);
		Wire.write(1);
		Wire.endTransmission();


	}
	digitalWrite(3,LOW);
	digitalWrite(5,LOW);

	Wire.beginTransmission(100);
	Wire.write(sensorValue1);
	Wire.write(sensorValue2);
	Wire.write(0);
	Wire.endTransmission();


	delay(100);        // delay in between reads for stability
}
