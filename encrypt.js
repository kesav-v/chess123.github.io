window.onload = function() {
	$('input[name="input1"]').keypress(find_string);
	console.log("loaded");
}

const y = "-6241447$471$5-5$-1$-47-47-5654547$471$5-5$-1$-47-7271147$471$5-5$-1$-8085047$471$5-5$-7398247$471$5-7134947$471$-1495147$47-1814947$";

function encrypt(s) {
	var str = "";
	for (i = 0; i < s.length; i++) {
		x = s.charCodeAt(i);
		str += String(Math.round(Math.cos(x) * (1 + x) - 6 * x * x));
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
	if (str === y) document.getElementById("text1").innerHTML = "Login succeeded.";
	else document.getElementById("text1").innerHTML = "Login failed.";
}