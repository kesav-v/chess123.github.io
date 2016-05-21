var func = "x";
window.onload = function() {
	$('input[name="entereqn"]').keyup(update_div);
	$('input[name="entereqn"]').keypress(update_div);
}

function update_div(e) {
	console.log($('#field1').val());
	document.getElementById("eqndiv").innerHTML = $('#field1').val();
}

function integral_simp(start, end, numRects) {
	if (numRects % 2 != 0) {
		console.log("ERROR: Not an even number of rectangles");
		return;
	}
	var sum = 0;
	for (k = 1; k <= numRects / 2; k++) {
		var x = start + (2 * k - 1) * (end - start) / numRects;
		sum += value(x);
		var x = start + (2 * k) * (end - start) / numRects;
		sum += value(x);
		var x = start + (2 * k - 2) * (end - start) / numRects;
		sum += value(x);
	}
	sum *= 2 * (end - start) / (3 * numRects);
	return sum;
}

function value(x1) {
	var func3 = "";
	for (i = 0; i < func.length; i++) {
		if (func[i] === "x") {
			func3 += x1;
		}
		else func3 += func[i];
	}
	return math.eval(func3);
}