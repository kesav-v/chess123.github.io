function flip(s) {
	var last_ind = 0;
	var new_str = "";
	console.log(s.length);
	for (i = 0; i < s.length; i++) {
		if (s[i] === ' ') {
			var ps = s.substring(last_ind, i);
			if (ps.length >= 2) ps = ps.substring(0, ps.length - 2) + (ps[ps.length - 1]) + (ps[ps.length - 2]);
			new_str += ps + " ";
			last_ind = i + 1;
		}
	}
	var ps = s.substring(last_ind, s.length);
	if (ps.length >= 2) ps = ps.substring(0, ps.length - 2) + (ps[ps.length - 1]) + (ps[ps.length - 2]);
	new_str += ps;
	return new_str;
}

window.onload = function() {
	$('input[name="origtext"]').keyup(get_string);
}

function get_string(e) {
	var str = $('input[name="origtext"]').val();
	document.getElementById("inverted-text").style.display = "inherit";
	document.getElementById("inverted-text").innerHTML = flip(str);
}