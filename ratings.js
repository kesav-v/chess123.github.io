var diffs = [3, 10, 17, 25, 32, 39, 46, 53, 61, 68, 76, 83, 91, 98, 106, 
			113, 121, 129, 137, 145, 153, 162, 170, 179, 188, 197, 206,
			215, 225, 235, 245, 256, 267, 278, 290, 302, 315, 328, 344,
			357, 374, 391];
var currField = 1;
var players = new Array();
for (m = 0; m < 26; m++) {
	players[m] = new Array();
}
var current_search = "";
var current_search2 = "";
var current_db = new Array();
var current_db2 = new Array();
var loaded = false;
var str = 'a';
const shift = str.charCodeAt(0);

function addField() {
	currField++;
	var form = document.createElement("form");
	form.setAttribute("class", "rating-enter");
	form.innerHTML = '<form class="rating-enter">\n<input name="form' + currField + '" class="rating-num" type="number">\n<input class="win" type="radio" name="result' + currField + '">\n<input class="draw" type="radio" name="result' + currField + '">\n<input class="lose" type="radio" name="result' + currField + '">\n</form><br>';
	document.getElementById("form-container").appendChild(form);
	form.value = "";
	$('form').submit(false);
	var elems = document.getElementsByClassName('remove-button');
	$(elems[elems.length - 1]).click(function(event) {
		var index = -1;
		var elems6 = document.getElementsByClassName('remove-button');
		for (x = 0; x < elems6.length; x++) {
			if (elems6[x] === event.target) {
				index = x;
				break;
			}
		}
		var tempelem = document.getElementsByClassName('rating-enter')[index];
		$(tempelem).remove();
		currField--;
	});
}

function removeField(n) {
	var elems = document.getElementsByClassName('rating-enter');
	if (elems.length === 0) return;
	elems[n].remove();
	currField--;
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
	var form1 = document.getElementsByClassName('rating-num')[0];
	form1.value = "";
	getText();
}

function setUpPage() {
	var ratingfields = document.getElementsByClassName('rating-num');
	for (i = 0; i < ratingfields.length; i++) {
		ratingfields[i].removeEventListener('submit', function() {});
	}
	document.getElementById("dropdown-names").style.width = document.getElementById("test-field").offsetWidth + "px";
	document.getElementById("dropdown-names2").style.width = document.getElementById("test-field2").offsetWidth + "px";
	$('form').submit(false);
	$('input').val("");
	document.getElementById("test-field").onkeyup = function(e) {
		if (e.keyCode === 13) return;
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
		if (srch.length > current_search.length) bestResults = search(srch);
		else bestResults = search(srch);
		current_db = bestResults;
		var links = document.getElementsByClassName("search-results");
		for (i = 0; i < links.length; i++) {
			if (bestResults.length === 0) {
				links[i].style.display = "none";
				continue;
			}
			if (i >= bestResults.length) {
				links[i].style.display = "none";
				continue;
			}
			links[i].style.display = "table-row";
			var title = getVal(bestResults[i], "title");
			var name = getVal(bestResults[i], "name");
			var rating = parseInt(getVal(bestResults[i], "rating"));
			var fed = getVal(bestResults[i], "country");
			links[i].getElementsByClassName("title")[0].innerHTML = title;
			links[i].getElementsByClassName("name")[0].innerHTML = name;
			links[i].getElementsByClassName("rating")[0].innerHTML = rating;
			links[i].getElementsByClassName("federation")[0].innerHTML = fed;
		}
		current_search = srch;
	}
	document.getElementById("test-field2").onkeyup = function(e) {
		if (e.keyCode === 13) return;
		var srch = document.getElementById("test-field2").value;
		if (srch.length === 0) {
			document.getElementById("dropdown-names2").style.display = "none";
			return;
		}
		document.getElementById("dropdown-names2").style.display = "inherit";
		var bestResults;
		if (srch.indexOf(",") != -1 && srch.indexOf(", ") == -1) {
			srch = srch.substring(0, srch.indexOf(",") + 1) + " " + srch.substring(srch.indexOf(",") + 1);
		}
		srch = srch.toLowerCase();
		if (srch.length > current_search2.length) bestResults = search(srch);
		else bestResults = search(srch);
		current_db2 = bestResults;
		var links = document.getElementsByClassName("search-results2");
		for (i = 0; i < links.length; i++) {
			if (bestResults.length === 0) {
				links[i].style.display = "none";
				continue;
			}
			if (i >= bestResults.length) {
				links[i].style.display = "none";
				continue;
			}
			links[i].style.display = "table-row";
			var title = getVal(bestResults[i], "title");
			var name = getVal(bestResults[i], "name");
			var rating = parseInt(getVal(bestResults[i], "rating"));
			var fed = getVal(bestResults[i], "country");
			var kf = getVal(bestResults[i], "k");
			links[i].getElementsByClassName("title")[0].innerHTML = title;
			links[i].getElementsByClassName("name")[0].innerHTML = name;
			links[i].getElementsByClassName("rating")[0].innerHTML = rating;
			links[i].getElementsByClassName("federation")[0].innerHTML = fed;
			links[i].getElementsByClassName("k-fac")[0].innerHTML = kf;
		}
		current_search2 = srch;
	}
	$('.search-results').click(function(event) {
		document.getElementById("dropdown-names").style.display = "none";
		var elems5 = document.getElementsByClassName('rating-num');
		var rating = event.target.parentElement.getElementsByClassName("rating")[0].innerHTML;
		rating = parseInt(rating);
		document.getElementById('test-field').value = "";
		var p;
		for (p = 0; p < elems5.length; p++) {
			if (elems5[p].value === "") {
				elems5[p].value = rating;
				break;
			}
		}
		if (p === elems5.length) {
			addField();
			document.getElementsByClassName('rating-num')[p].value = rating;
		}
	});
	$('.search-results2').click(function(event) {
		document.getElementById("dropdown-names2").style.display = "none";
		var rating = event.target.parentElement.getElementsByClassName("rating")[0].innerHTML;
		var kfact = event.target.parentElement.getElementsByClassName("k-fac")[0].innerHTML;
		rating = parseInt(rating);
		kfact = parseInt(kfact);
		document.getElementById('test-field2').value = "";
		var ownrating = document.getElementById('own-rating');
		var kfactor = document.getElementById('k-factor');
		ownrating.value = rating;
		kfactor.value = kfact;
	});
	$('.remove-button').click(function(event) {
		var index = -1;
		var elems6 = document.getElementsByClassName('remove-button');
		for (x = 0; x < elems6.length; x++) {
			if (elems6[x] === event.target) {
				index = x;
				break;
			}
		}
		var tempelem = document.getElementsByClassName('rating-enter')[index];
		$(tempelem).remove();
		currField--;
	});
}

function getText() {
	readData();
	return;
	if (loaded) return;
	msg.innerHTML = "Loading file...";
	var xhttp = new XMLHttpRequest();
	xhttp.addEventListener("progress", updateProgress);
	xhttp.onreadystatechange = function() {
	    if (xhttp.readyState == 4 && xhttp.status == 200) {
	    	readData(xhttp);
	    }
	}
	xhttp.open("GET", "rating_lists/standard_rating_list.txt", true);
	xhttp.send();
}

function updateProgress(oEvent) {
	if (!oEvent.lengthComputable) {
		msg.innerHTML = "Loading data...";
		return;
	}
	var finished = oEvent.loaded;
	var total = oEvent.total;
	var percent = finished / total * 100;
	msg.innerHTML = "Loading data - " + Math.round(percent) + "%...";
}

function search(str) {
	var db = players[str.charAt(0)];
	if (str.length === 1) return db;
	var matches = new Array();
	var count = 0;
	for (var i = 0; i < db.length; i++) {
		if (beginsWith(db[i][1], str)) {
			matches[count] = db[i];
			count++;
		}
	}
	return matches;
}

function beginsWith(name, start) {
	return (name.toLowerCase().indexOf(start.toLowerCase()) === 0);
}

function readData() {
	var xmlDoc = data();
	var temp = xmlDoc;
	temp = temp.substring(temp.indexOf('\n') + 1);
	msg.innerHTML = "Loading data...";
	var cnt = new Array();
	for (x = 0; x < 26; x++) {
		cnt[x] = 0;
	}
	var count = 0;
	var newline = -1;
	var nl = temp.indexOf('\n');
	console.log("populating lists");
	while (nl != -1) {
		nl = temp.indexOf('\n', newline + 1);
		var part1 = temp.substring(newline + 1, nl);
		var parts = new Array();
		var indices = [0, 15, 76, 80, 84, 89, 94, 109, 115, 119, 122, 128, part1.length];
		var cnt1 = 0;
		for (i = 0; i < indices.length - 1; i++) {
			parts[cnt1] = part1.substring(indices[i], indices[i + 1]).trim();
			cnt1++;
			if (i == 1) {
				parts[cnt1] = parts[cnt1 - 1].substring(parts[cnt1 - 1].indexOf(',') + 2);
				cnt1++;
			}
		}
		if (parts[1].length === 0) continue;
		var index = parts[1].toLowerCase().charCodeAt(0) - shift;
		if (players[parts[1].toLowerCase().charAt(0)] === undefined) {
			players[parts[1].toLowerCase().charAt(0)] = new Array();
		}
		players[parts[1].toLowerCase().charAt(0)][cnt[index]] = parts;
		cnt[index]++;
		newline = nl;
		count++;
	}
	console.log("done");
	console.log(players['a'].length);
	msg.style.display = "none";
	document.getElementById("all-forms").style.display = "inherit";
	current_db = players;
	current_db2 = players;
	loaded = true;
	setUpPage();
}

function getVal(player, attribute) {
	switch (attribute) {
		case "fideid": return player[0];
		case "name": return player[1];
		case "firstname": return player[2];
		case "country": return player[3];
		case "sex": return player[4];
		case "title": return player[5];
		case "w_title": return player[6];
		case "o_title": return player[7];
		case "rating": return player[8];
		case "games": return player[9];
		case "k": return player[10];
		case "birthday": return player[11];
		case "flag": return player[12];
	}
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
        if (getVal(left[il], "firstname").localeCompare(getVal(right[ir], "firstname")) < 0) {
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
}