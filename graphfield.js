var c2 = document.getElementById("mycanvas2");
var ctx2 = c2.getContext("2d");
var width2 = c2.width;
var height2 = c2.height;
var mouseX2 = width / 2;
setTimeout(paint, 100);
c2.onmousemove = trace_graph;

function paint() {
	ctx2.clearRect(0, 0, width2, height2);
	ctx2.strokeStyle = "#ffffff";
	ctx2.lineWidth = 5;
	ctx2.beginPath();
	ctx2.moveTo(width2 / 2, 0);
	ctx2.lineTo(width2 / 2, height2);
	ctx2.stroke();
	ctx2.moveTo(0, height2 / 2);
	ctx2.lineTo(width2, height2 / 2);
	ctx2.stroke();
	for (c = 0; c < width2; c += width2 / 20) {
		ctx2.beginPath();
		ctx2.moveTo(c, height2 / 2 - 10);
		ctx2.lineTo(c, height2 / 2 + 10);
		ctx2.stroke();
	}
	for (d = 0; d < height2; d += height2 / 20) {
		ctx2.beginPath();
		ctx2.moveTo(width2 / 2 - 10, d);
		ctx2.lineTo(width2 / 2 + 10, d);
		ctx2.stroke();
	}
	ctx2.lineWidth = 3;
	ctx2.strokeStyle = "#ff0000";
	for (b = 0; b < width2; b++) {
		var x1 = (b - width2 / 2) / (width2 / 20);
		var x2 = (b + 1 - width2 / 2) / (width2 / 20);
		var field1 = get_field(x1, 0);
		var field2 = get_field(x2, 0);
		var y1 = field1[0];
		var y2 = field2[0];
		if (y1 <= 10 || y2 >= -10 || y1 >= -10 || y2 <= 10) {
			ctx2.beginPath();
			ctx2.moveTo(b, height2 / 2 - height2 / 20 * y1);
			ctx2.lineTo(b + 1, height2 / 2 - y2 * height2 / 20);
			ctx2.stroke();
		}
	}
	ctx2.fillStyle = "#ff0000";
	ctx2.beginPath();
	var y3 = get_field((mouseX2 - width2 / 2) / (width2 / 20), 0)[0];
	ctx2.ellipse(mouseX2, height2 / 2 - y3 * height2 / 20, 10, 10, 0, 0, 2 * Math.PI);
	ctx2.fill();
	ctx2.beginPath();
	var x3 = Math.round((mouseX2 - width2 / 2) / (width2 / 20) * 1000) / 1000;
	y3 = Math.round(y3 * 1000) / 1000;
	ctx2.font = "24px Comic Sans MS";
	var coord = "E(" + x3 + ") = " + y3;
	ctx2.fillText(coord, width * 0.7, height * 0.9);
}

function trace_graph(e) {
	mouseX2 = e.clientX - $("#mycanvas2").position().left + window.scrollX;
	console.log(mouseX2);
	paint();
}