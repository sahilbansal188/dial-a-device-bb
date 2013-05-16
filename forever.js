b = require ('bonescript');

var ledPin = "P8_13";
var ledPin2 = "USR3";

b.pinMode(ledPin, b.OUTPUT);
b.pinMode(ledPin2, b.OUTPUT);

var state = b.LOW;
b.digitalWrite(ledPin, state);
b.digitalWrite(ledPin2, state);

forever = require ('forever-monitor');

var child = new (forever.Monitor)('start.js', {
	silent: true,
	sourceDir: '/var/lib/cloud9/dial-a-device-bb',
	killTree: true,
	options: []
});

child.on('error', function () {
	var state = b.LOW;
	b.digitalWrite(ledPin, state);
	b.digitalWrite(ledPin2, state);
});

child.on ('restart', function () {
	var state = b.HIGH;
	b.digitalWrite(ledPin, state);
	b.digitalWrite(ledPin2, state);
});

child.on ('start', function () {
	var state = b.HIGH;
	b.digitalWrite(ledPin, state);
	b.digitalWrite(ledPin2, state);
});

child.on ('stop', function() {
	var state = b.LOW;
	b.digitalWrite(ledPin, state);
	b.digitalWrite(ledPin2, state);
});

child.start();
