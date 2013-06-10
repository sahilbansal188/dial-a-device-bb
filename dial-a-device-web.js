var myhttp = require ('http');

(function(exports) {

	exports.getDeviceInfo = function (serialnumber) {
    	return "device id = 1"

    }

    exports.getBBInfo = function (serialnumber, callback, callback2) {

    	myhttp.get ("http://www.dial-a-device.com/connect/"+serialnumber+".json", function (res) {
    		var body = "";

    		res.on ('data', function (chunk) {
    			body += chunk;
    		});

    		res.on ('end', function () {
    			var myResponse = JSON.parse (body);
    			if (myResponse[0]) {
    				callback (myResponse[0]);
    			} else {
    				callback ({});
    			}
    		})
    	}).on ('error', function (e) {
    		callback2 (e.message);
    	});

    }

    exports.setBBInfo = function (bbinfo, myip, myserial, callback) {

    	var options =  {
    		hostname: "www.dial-a-device.com",
    		port: 80,
    		path: "/beaglebones/"+bbinfo.id,
    		method: "PUT",
    		headers: {'content-type': 'application/json'}
    	}

    	if (!bbinfo.id) {

    		options =  {
    		hostname: "www.dial-a-device.com",
    		port: 80,
    		path: "/beaglebones",
    		method: "POST",
    		headers: {'content-type': 'application/json'}
    	}

    	}

    	var postdata = JSON.stringify({

    		beaglebone: {

    			ipaddress: myip,
    			serialnumber: myserial
    		},

    		commit: "Update Beaglebone"

    	});

    	var request = myhttp.request (options, function (res) {
    		var body = "";

    		res.on ('data', function (chunk) {
    			body += chunk;
    		});

    		res.on ('end', function () {
    			if (callback) callback();

    		})
    	}).on ('error', function (e) {
    		console.log (e.message);
    	});

    	request.write (postdata);
    	request.end();

    }
  


})(typeof exports == 'undefined'? this['dialadeviceweb'] = {}: exports);