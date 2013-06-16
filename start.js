var bb = true;

var serverurl = "http://www.dial-a-device.com"

var bbinfo;

try {
	b = require ('bonescript');
} catch (err) {
	bb = false;
}

if (bb) {

var ledPin = "P8_13";
var ledPin2 = "USR3";

b.pinMode(ledPin, b.OUTPUT);
b.pinMode(ledPin2, b.OUTPUT);

var state = b.LOW;
b.digitalWrite(ledPin, state);
b.digitalWrite(ledPin2, state);

}


var beaglebonechip = require ('./beaglebonechip.js');

var dialadeviceweb = require ('./dial-a-device-web.js');

function start() {
	getSN();
}


function getSN() {
beaglebonechip.getSerialNumber(bb);

var intervalIPcheck = setInterval (function() {

	if (beaglebonechip.myserial()) {

		console.log ("serial number: "+beaglebonechip.myserial());

		clearInterval(intervalIPcheck);
		getIPAddress();
	}

}, 1000);


};


function getIPAddress() {
beaglebonechip.getIPAddress();

var intervalIPcheck = setInterval (function() {

	if (beaglebonechip.myip()) {

		console.log ("ip address: "+beaglebonechip.myip());

		clearInterval(intervalIPcheck);
		getBBInfo();
	}

}, 1000);

};




function getBBInfo() {



var intervalIDcheck = setInterval (function() {

	if (bbinfo) {
		clearInterval(intervalIDcheck);
		if (bbinfo.id) {updateBB();} else {
			createBB();
		}
	}

}, 1000);

dialadeviceweb.getBBInfo(serverurl, beaglebonechip.myserial(), function (message) {
	bbinfo = message;

}, function (message) {
	clearInterval(intervalIDcheck);
	console.log ("Error "+message);
});

};


function createBB() {

	dialadeviceweb.setBBInfo(serverurl, bbinfo, beaglebonechip.myip(), beaglebonechip.myserial(), getBBInfo());
	

};


function updateBB() {

	

	// successfully connected
	if (bb) {
		var state = b.HIGH;
		b.digitalWrite(ledPin, state);
		b.digitalWrite(ledPin2, state);
	}

	dialadeviceweb.setBBInfo(serverurl, bbinfo, beaglebonechip.myip(), beaglebonechip.myserial(), startNode());
	

};

function startNode () {

	
	console.log ('beaglebone:');
	console.log (bbinfo);

var dialadevicenode = require ('dial-a-device-node');

dialadevicenode.set_ser_string (bbinfo.device.portname);

dialadevicenode.set_ser_baud (bbinfo.device.portbaud);

dialadevicenode.set_device_id (bbinfo.device.id);

dialadevicenode.set_url_string (serverurl+'/websocket');

dialadevicenode.set_device_type (bbinfo.devicetype.name);

dialadevicenode.set_unique_id ('gf638h2g7g86g3');

dialadevicenode.set_simulate (false);

dialadevicenode.run();

}


start();