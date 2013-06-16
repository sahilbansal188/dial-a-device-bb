var util = require ('util');
var exec = require ('child_process').exec;

var os = require ('os');

(function(exports) {

	var ipaddress;
	var serialnumber;

	exports.getSerialNumber = function (bb) {

        if (bb) {

    	exec ("hexdump -e '8/1 \"%c\"' /sys/bus/i2c/devices/0-0050/eeprom -s 16 -n 12", function(error, stdout, stderr) {

    		serialnumber = stdout;
    	});
    } else {

        require('getmac').getMac(function(err,macAddress){
            if (err)  throw err;
            serialnumber = macAddress.replace(/\:/g, "");  
        });

    }

    }

    exports.myserial = function () {
    	return serialnumber;
    }

    exports.myip = function () {
    	return ipaddress;
    }

    exports.getIPAddress = function () {

    	var interfaces = os.networkInterfaces();
    	var addresses = [];
    	for (k in interfaces) {
    		for (k2 in interfaces[k]) {
    			var address = interfaces[k][k2];
    			if (address.family == "IPv4" && !address.internal) {
    				ipaddress = address.address;
    			}
    		}
    	}

    	if (!ipaddress) {
    		ipaddress = "127.0.0.1";
    	}

    }
  


})(typeof exports == 'undefined'? this['beaglebonechip'] = {}: exports);