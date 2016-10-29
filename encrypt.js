window.onload = function() {
	getKey();
	$('input[name="input1"]').keypress(find_string);
}

var y;
function getKey() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for older browsers
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      y = this.responseText;
    }
  };
  xmlhttp.open("GET", "key.txt", true);
  xmlhttp.send();
}
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