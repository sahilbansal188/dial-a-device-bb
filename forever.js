var bb = true;

try {
	b = require ('bonescript');
} catch (err) {
	bb = false;
}


if (bb) {

var ledPin = "P8_13";
var ledPin2 = "USR3";

if (b) b.pinMode(ledPin, b.OUTPUT);
if (b) b.pinMode(ledPin2, b.OUTPUT);

var state = b.LOW;
b.digitalWrite(ledPin, state);
b.digitalWrite(ledPin2, state);

}


forever = require ('forever-monitor');

var child = new (forever.Monitor)('start.js', {
	silent: true,
	sourceDir: '/var/lib/cloud9/dial-a-device-bb',
	killTree: true,
	options: []
});

child.start();
