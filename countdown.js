window.onload = function() {
	get_current_time();
	var timer = setInterval(get_current_time, 1000);
}

function get_current_time() {
	var d = new Date();
	document.getElementById("displaytime").innerHTML = get_time_difference(d);
}

function get_time_difference(time) {
	var grad = new Date(2017,5,1,9,30,0,0);
	var t2 = grad.getTime();
	var t1 = time.getTime();
	var ms = t2 - t1;
	var years, days, hours, minutes, seconds, milliseconds;
	var n = ms;
	milliseconds = n % 1000 | 0;
	n = n / 1000 | 0;
	seconds = n % 60 | 0;
	n = n / 60 | 0;
	minutes = n % 60 | 0;
	n = n / 60 | 0;
	hours = n % 24 | 0;
	n = n / 24 | 0;
	days = n % 365 | 0;
	n = n / 365 | 0;
	years = n | 0;
	var str = days + ":";
	var h = hours.toString();
	for (i = 0; i < 2 - h.length; i++) {
		str += "0";
	}
	str += hours + ":";
	var m = minutes.toString();
	for (i = 0; i < 2 - m.length; i++) {
		str += "0";
	}
	str += minutes + ":";	
	var s = seconds.toString();
	for (i = 0; i < 2 - s.length; i++) {
		str += "0";
	}
	str += seconds;
	return str;
}