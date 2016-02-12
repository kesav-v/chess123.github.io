var letterOrder = ['y', 'w', 'j', 'r', 'u', 'n', 'x', 't', 'o', 'p',
					'g', 's', 'd', 'f', 'a', 'h', 'q', 'k', 'l',
					'z', 'i', 'c', 'v', 'b', 'e', 'm'];

function flip(s) {
	s = s.toLowerCase();
	var last_ind = 0;
	var new_str = "";
	for (i = 0; i < s.length; i++) {
		if (s[i] === ' ') {
			var non_punc = 0;
			for (a = i - 1; a > last_ind; a++) {
				if (s.charCodeAt(a) < 97 || s.charCodeAt(a) > 122) {
					non_punc++;
				}
				else break;
			}
			var ps = s.substring(last_ind, i);
			if (ps.length >= 2) ps = ps.substring(0, ps.length - 2 - non_punc) + (ps[ps.length - 1 - non_punc]) + (ps[ps.length - 2 - non_punc]) + ps.substring(ps.length - non_punc, ps.length);
			new_str += ps + " ";
			last_ind = i + 1;
		}
		else {
			var ps = s[i];
			var n = index(ps);
			if (n >= 0) ps = String.fromCharCode(n + 97);
			s = s.substring(0, i) + ps + s.substring(i + 1, s.length);
		}
	}
	var non_punc = 0;
	for (a = i - 1; a > last_ind; a++) {
		if (s.charCodeAt(a) < 97 || s.charCodeAt(a) > 122) {
			non_punc++;
		}
		else break;
	}
	var ps = s.substring(last_ind, s.length);
	if (ps.length >= 2) ps = ps.substring(0, ps.length - 2 - non_punc) + (ps[ps.length - 1 - non_punc]) + (ps[ps.length - 2 - non_punc]) + ps.substring(ps.length - non_punc, ps.length);
	new_str += ps;
	return new_str;
}

function index(str) {
	for (h = 0; h < letterOrder.length; h++) {
		if (letterOrder[h] === str) return h;
	}
	return -1;
}

window.onload = function() {
	$('input[name="origtext"]').keyup(get_string);
}

function get_string(e) {
	document.getElementById("inverted-text").innerHTML = "";
	var str = $('input[name="origtext"]').val();
	document.getElementById("inverted-text").style.display = "inherit";
	for (ak = 0; ak < 26; ak++) {
		str = flip(str);
		document.getElementById("inverted-text").innerHTML += (ak + 1) + ") " + str +"<br/><br/>";
	}
}