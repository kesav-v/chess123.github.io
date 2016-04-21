window.onload = function() {
	$('input[name="input1"]').keypress(find_string);
	console.log("loaded");
}

const x = "68%;%#-8247$471$5-5$-1$-47-4763%;%#-7747$471$5-5$-1$-47122%;%#-9047$471$5-5$-1$124%;%#-9647$471$5-5$129%;%#-9147$471$5123%;%#-8947$471$110%;%#-3047$47115%;%#-3547$";

function encrypt(s) {
	var str = "";
	for (i = 0; i < s.length; i++) {
		str += String(s.charCodeAt(s.length - i - 1) + 13) + "%;%#";
		str += String(20 - s.charCodeAt(i));
		for (j = 0; j < s.length - i; j++) {
			str += String(s.charCodeAt(j) - s.charCodeAt(s.length - j - 1));
			if (s.charCodeAt(j) % s.charCodeAt(0) <= 10) str += "$";
		}
	}
	return str;
}

function find_string(e) {
	if (e.which != 13) return;
	var str = encrypt($('input[name="input1"]').val());
	if (str === x) document.getElementById("text1").innerHTML = "Login succeeded.";
	else document.getElementById("text1").innerHTML = "Login failed.";
}