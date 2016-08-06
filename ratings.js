var diffs = [3, 10, 17, 25, 32, 39, 46, 53, 61, 68, 76, 83, 91, 98, 106, 
			113, 121, 129, 137, 145, 153, 162, 170, 179, 188, 197, 206,
			215, 225, 235, 245, 256, 267, 278, 290, 302, 315, 328, 344,
			357, 374, 391];
var currField = 1;
var ids = new Array();
var names = new Array();
var ratings = new Array();

function addField() {
	currField++;
	var form = document.createElement("form");
	form.setAttribute("class", "rating");
	form.innerHTML = '<input name="' + currField + '" class="rating-num" type="number">\n<input class="win" type="radio" name="result' + currField + '">\n<input class="draw" type="radio" name="result' + currField + '">\n<input class="lose" type="radio" name="result' + currField + '">';
	document.getElementById("form-container").appendChild(form);
}

function removeField() {
	currField--;
	var elems = document.getElementsByClassName('rating');
	if (elems.length === 0) return;
	elems[elems.length - 1].remove();
}

function calcRating(r1, r2, res, k) {
	var diff = Math.abs(r1 - r2);
	var prob = 0;
	for (i = 0; i < diffs.length; i++) {
		if (diff <= diffs[i]) {
			prob = 0.5 + 0.01 * i;
			break;
		}
	}
	if (prob === 0) prob = 0.92;
	var change = -1;
	if (r1 > r2) change = prob;
	if (r1 < r2) change = 1 - prob;
	var delta = res - change;
	console.log(delta, change, res, k, diff, prob);
	return k * delta;
}

function crunchData() {
	var total = 0;
	var rating1 = parseInt(document.getElementById('own-rating').value);
	var k = parseInt(document.getElementById('k-factor').value);
	var elems1 = document.getElementsByClassName('rating-num');
	var elems2 = document.getElementsByClassName('win');
	var elems3 = document.getElementsByClassName('draw');
	var elems4 = document.getElementsByClassName('lose');
	console.log(rating1 + k, currField);
	for (j = 0; j < currField; j++) {
		var r2 = parseInt(elems1[j].value);
		if (r2 === 0) continue;
		var result = 0;
		if (elems2[j].checked) result = 1;
		else if (elems3[j].checked) result = 0.5;
		else if (elems4[j].checked) result = 0;
		else continue;
		console.log(rating1 + " " + r2 + " " + result + " " + k);
		total += calcRating(rating1, r2, result, k);
	}
	document.getElementById("rating-change").innerHTML = "Your rating change is: " + (Math.round(total * 10) / 10);
}

window.onload = getXML();

function getXML() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	readData(xhttp);
	    }
	}
	xhttp.open("GET", "rating_lists/standard_rating_list_xml.xml", true);
	xhttp.send();
}

function readData(xml) {
	var xmlDoc = xml.responseXML;
	document.getElementById("xml-test").innerHTML = xmlDoc.getElementsByTagName("name") + "******";
}