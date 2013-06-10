var util = require ('util');
var exec = require ('child_process').exec;

(function(exports) {

	var ipaddress;
	var serialnumber;

	exports.getSerialNumber = function () {
		
    	exec ("hexdump -e '8/1 \"%c\"' /sys/bus/i2c/devices/0-0050/eeprom -s 16 -n 12", function(error, stdout, stderr) {

    		serialnumber = stdout;
    	});

    }

    exports.myserial = function () {
    	return serialnumber;
    }

    exports.myip = function () {
    	return ipaddress;
    }

    exports.getIPAddress = function () {

    	exec ("hostname -i", function(error, stdout, stderr) {

    		ipaddress = stdout;
    	});

    }
  


})(typeof exports == 'undefined'? this['beaglebonechip'] = {}: exports);