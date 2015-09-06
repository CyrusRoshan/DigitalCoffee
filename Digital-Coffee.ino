//This one's for the photon


int leftSensor;
int rightSensor;
bool alert;

void receiveEvent(int howMany){
	if(howMany == 3){
		Serial.println("-------------------");
		char c = Wire.read();
		leftSensor = c;
		Serial.print("Sensor 1: ");
		Serial.println(c, DEC);

		c = Wire.read();
		rightSensor = c;
		Serial.print("Sensor 2: ");
		Serial.println(c, DEC);

		c = Wire.read();
		if(c == 1){
			Serial.println("Alert: true");
			alert = true;
		}
		else{
			Serial.println("Alert: false");
			alert = false;
		}
	}

}

void setup(){
	Particle.variable("leftSensor", &leftSensor, INT);
	Particle.variable("rightSensor", &rightSensor, INT);
	Particle.variable("alert", &alert, BOOLEAN);
	Wire.begin(100);    // join i2c bus with address #4
	Wire.onReceive(receiveEvent); // register event
	Serial.begin(9600);           // start serial for output
}

void loop(){
	delay(100);
}
