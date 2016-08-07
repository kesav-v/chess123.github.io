var diffs = [3, 10, 17, 25, 32, 39, 46, 53, 61, 68, 76, 83, 91, 98, 106, 
			113, 121, 129, 137, 145, 153, 162, 170, 179, 188, 197, 206,
			215, 225, 235, 245, 256, 267, 278, 290, 302, 315, 328, 344,
			357, 374, 391];
var currField = 1;
var players = new Array();
var current_search = "";
var current_db = new Array();

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
	for (j = 0; j < currField; j++) {
		var r2 = parseInt(elems1[j].value);
		if (r2 === 0) continue;
		var result = 0;
		if (elems2[j].checked) result = 1;
		else if (elems3[j].checked) result = 0.5;
		else if (elems4[j].checked) result = 0;
		else continue;
		total += calcRating(rating1, r2, result, k);
	}
	document.getElementById("rating-change").innerHTML = "Your rating change is: " + (Math.round(total * 10) / 10);
}

var msg;

window.onload = function() {
	msg = document.getElementById("xml-test");
	getXML();
	document.getElementById("dropdown-names").style.width = document.getElementById("test-field").offsetWidth + "px";
	document.getElementById("test-field").onkeyup = function() {
		var srch = document.getElementById("test-field").value;
		if (srch.length === 0) {
			document.getElementById("dropdown-names").style.display = "none";
			return;
		}
		document.getElementById("dropdown-names").style.display = "inherit";
		var bestResults;
		if (srch.indexOf(",") != -1 && srch.indexOf(", ") == -1) {
			srch = srch.substring(0, srch.indexOf(",") + 1) + " " + srch.substring(srch.indexOf(",") + 1);
		}
		srch = srch.toLowerCase();
		if (srch.length > current_search.length) bestResults = search(current_db, srch);
		else bestResults = search(players, srch);
		current_db = bestResults;
		var links = document.getElementsByClassName("search-results");
		for (i = 0; i < links.length; i++) {
			if (i >= bestResults.length) {
				links[i].innerHTML = "";
				continue;
			}
			var title = getVal(bestResults[i], "title");
			var temp_string = "";
			if (title.length > 0) temp_string += title + " ";
			temp_string += getVal(bestResults[i], "name") + " (" + getVal(bestResults[i], "rating") + ") (" + getVal(bestResults[i], "country") + ")";
			links[i].innerHTML = temp_string;
		}
		current_search = srch;
	}
	$('.search-results').click(function(event) {
		document.getElementById("dropdown-names").style.display = "none";
		var str = event.target.innerHTML;
		var elems5 = document.getElementsByClassName('rating-num');
		document.getElementById('test-field').value = "";
		var p;
		for (p = 0; p < elems5.length; p++) {
			if (elems5[p].value === "") {
				elems5[p].value = parseInt(str.substring(str.indexOf('(') + 1, str.indexOf(')')));
				break;
			}
		}
		if (p === elems5.length) {
			addField();
			document.getElementsByClassName('rating-num')[p].value = parseInt(str.substring(str.indexOf('(') + 1, str.indexOf(')')));
		}
	});
}

function getXML() {
	msg.innerHTML = "Loading file...";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	readData(xhttp);
	    }
	}
	xhttp.open("GET", "rating_lists/standard_rating_list_xml.xml", true);
	xhttp.send();
}

function search(db, str) {
	var matches = new Array();
	var cnt = 0;
	for (i = 0; i < db.length; i++) {
		var tempName = getVal(db[i], "name");
		if (beginsWith(tempName, str)) {
			matches[cnt] = db[i];
			cnt++;
		}
		// if (cnt == 100) break;
	}
	return matches;
}

function beginsWith(name, start) {
	return (name.toLowerCase().indexOf(start) === 0);
}

function readData(xml) {
	var xmlDoc = xml.responseXML;
	msg.innerHTML = "Loading data...";
	var player_elems = xmlDoc.getElementsByTagName("player");
	for (q = 0; q < player_elems.length; q++) {
		players[q] = player_elems[q];
	}
	msg.innerHTML = "Sorting by rating...";
	players = mergeSort(players);
	msg.style.display = "none";
	current_db = players;
	// ratings = mergeSort(ratings);
	// var rating_ranges = new Array();
	// for (i = 0; i < 30; i++) {
	// 	rating_ranges[i] = 0;
	// }
	// for (i = 0; i < ratings.length; i++) {
	// 	rating_ranges[ratings[i] / 100 | 0]++;
	// }
	// for (i = 0; i < rating_ranges.length; i++) {
	// 	console.log(100 * i + ": " + rating_ranges[i]);
	// }
}

function getVal(player, attribute) {
	return player.getElementsByTagName(attribute)[0].innerHTML;
}

function mergeSort(items) {

    if (items.length < 2) {
        return items;
    }

    var middle = Math.floor(items.length / 2),
        left    = items.slice(0, middle),
        right   = items.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result  = [],
        il      = 0,
        ir      = 0;

    while (il < left.length && ir < right.length) {
        if (parseInt(getVal(left[il], "rating")) > parseInt(getVal(right[ir], "rating"))){
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
}