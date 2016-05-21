window.onload = function() {
	$('input[name="input1"]').keypress(find_string);
}

const y = "1010001100001111111100111011001010101111000010101001011110000110010111111110000111011000010011111011110001010110010100011001101101010001110001010010001001010111100111110111100001010100101111000011001010101110110011001011101001010101111000011100011010001111010100000011001110111111101010011101101110001101011111101011011100101010111011111001110100110011101110101101110011011111111111010011011011100110010001101100101000111101011011100110110011101001100101011001000111100001110011111011011100111001101100111010011010111111010110111001010101110111110011101001100111010111101111110101111010101100101011111011101010101100101011110100111110111011111000000101011011001011101111100111110111100001010100101111000011001110101011010101000011010111001101100101011001011001101111000011010100101001101010011001111100110011111011110000101010010111011111111110110101101100110010010";
console.log(decrypt(y));

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
	var str2 = "";
	for (i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) <= "9".charCodeAt(0) && str.charCodeAt(i) >= "0".charCodeAt(0)) str2 += str[i];
	}
	var str3 = "";
	for (i = 0; i < str2.length; i++) {
		str3 += to_bin(parseInt(str2[i] + str2[str2.length - i - 1]));
	}
	return str3;
}

function newton(x) {
	var cur = 100;
	for (a = 0; a < 100; a++) {
		var m = ((Math.cos(cur + 0.00001) * (1.00001 + cur) - 6 * (cur + 0.00001) * (cur + 0.00001) - x) - (Math.cos(cur) * (1 + cur) - 6 * cur * cur - x)) / 0.00001;
		cur = cur - (Math.cos(cur) * (1 + cur) - 6 * cur * cur - x) / m;
	}
	return Math.round(cur);
}

function decrypt(s) {
	var str2 = "";
	for (i = 0; i < s.length; i += 6) {
		var temp = i;
		if (i + 6 <= s.length) temp = i + 6;
		else temp = s.length;
		var number = to_dec(s.substring(i, temp));
		str2 = number[0] + str2 + number[1];
	}
	var original = "";
	for (i = 0; i < str2.length; i += 8) {
		var n = parseInt(str2.substring(i, i + 5));
		var soln = newton(-n);
		console.log(soln);
		original += String.fromCharCode(soln);
	}
	return original;
}

function to_dec(str) {
	var num = 0;
	for (j = 0; j < str.length; j++) {
		var n = parseInt(str[j]);
		num += n * Math.pow(2, str.length - j);
	}
	return String(num);
}

function change_msg() {
	document.getElementById("text1").innerHTML = "Congrats on cracking the password! Now go find something more useful to do.";
	document.getElementById("text1").style.color = "black";
	document.getElementById("text1").style.fontSize = "20px";
	document.getElementById("text1").style.marginTop = "40px";
	document.getElementById("input-holder").style.display = "none";
}

function find_string(e) {
	if (e.which != 13) return;
	document.getElementById("text1").innerHTML = "Checking...";
	document.getElementById("text1").style.color = "gray";
	setTimeout(function() {		
		var string = encrypt($('input[name="input1"]').val());
		console.log(string);
		if (string === y) {
			document.getElementById("text1").innerHTML = "Login succeeded.";
			document.getElementById("text1").style.color = "green";
			document.getElementsByClassName("inp")[0].style.border = "5px solid green";
			document.getElementsByClassName("inp")[0].style.color = "green";
			setTimeout(change_msg, 2000);
		}
		else {
			document.getElementById("text1").innerHTML = "Login failed.";
			document.getElementById("text1").style.color = "red";
			document.getElementsByClassName("inp")[0].style.border = "5px solid red";
			document.getElementsByClassName("inp")[0].style.color = "red";
		}
	}, 1000);
}

function to_bin(n) {
	if (n < 2) return n + "";
	return to_bin(n / 2 | 0) + (n % 2) + "";
}