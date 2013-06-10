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

}


var beaglebonechip = require ('./beaglebonechip.js');

var sn = beaglebonechip.getSerialNumber();

console.log ("chip serial number: "+sn);



var dialadeviceweb = require ('./dial-a-device-web.js');

console.log (dialadeviceweb.getDeviceInfo(sn));


// successfully connected
if (bb) {
var state = b.HIGH;
b.digitalWrite(ledPin, state);
b.digitalWrite(ledPin2, state);
}

var dialadevicenode = require ('dial-a-device-node');

dialadevicenode.set_ser_string ('/dev/ttyACM0');

dialadevicenode.set_ser_baud (115200);

dialadevicenode.set_device_id (1);

dialadevicenode.set_url_string ('http://www.dial-a-device.com/websocket');

dialadevicenode.set_device_type ('knf-sc920');

dialadevicenode.set_unique_id ('gf638h2g7g86g3');

dialadevicenode.set_simulate (true);

// dialadevicenode.run();
