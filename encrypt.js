window.onload = function() {
	$('input[name="input1"]').keypress(find_string);
	console.log("loaded");
}
const x = "128%;%#-94113%;%#-77124%;%#-78124%;%#-78132%;%#-88114%;%#-81121%;%#-99111%;%#-91111%;%#-91110%;%#-80127%;%#-95";

function encrypt(s) {
	var str = "";
	for (i = 0; i < s.length; i++) {
		str += String(s.charCodeAt(s.length - i - 1) + 13) + "%;%#";
		str += String(20 - s.charCodeAt(i));
	}
	return str;
}

function find_string(e) {
	if (e.which != 13) return;
	var str = encrypt($('input[name="input1"]').val());
	if (str === x) document.getElementById("text1").innerHTML = "Login succeeded.";
	else document.getElementById("text1").innerHTML = "Login failed.";
}