var canvases = document.getElementsByClassName("draw-canvas");
var ctx = [];
for (i = 0; i < canvases.length; i++) {
	ctx[i] = canvases[i].getContext('2d');
}

function line(num, x1, y1, x2, y2) {
	var g = ctx[num - 1];
	g.beginPath();
	g.moveTo(x1, y1);
	g.lineTo(x2, y2);
	g.stroke();	
}

function clear(num) {
	ctx[num - 1].clearRect(0, 0, canvases[num - 1].width, canvases[num - 1].length);
}

function drawCircle(num, x0, y0, radius) {
	var g = ctx[num - 1];
	g.beginPath();
	g.ellipse(x0, y0, radius, radius, 0, 0, 2 * Math.PI);
	g.stroke();
}

function fillCircle(num, x0, y0, radius) {
	var g = ctx[num - 1];
	g.beginPath();
	g.ellipse(x0, y0, radius, radius, 0, 0, 2 * Math.PI);
	g.fill();
}

function drawOval(num, x0, y0, a, b) {
	var g = ctx[num - 1];
	g.beginPath();
	g.ellipse(x0, y0, a, b, 0, 0, 2 * Math.PI);
	g.draw();
}

function fillOval(num, x0, y0, a, b) {
	var g = ctx[num - 1];
	g.beginPath();
	g.ellipse(x0, y0, a, b, 0, 0, 2 * Math.PI);
	g.fill();
}

function setFillColor(num, color) {
	ctx[num - 1].fillStyle = color;
}

function setStrokeColor(num, color) {
	ctx[num - 1].strokeStyle = color;
}