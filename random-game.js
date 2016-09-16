var c = document.getElementById("hello");
var ctx = c.getContext('2d');
var timer;
var sides = 3;

window.onload = function() {
	c.setAttribute("width", document.documentElement.clientWidth * 0.9 + "px");
	c.setAttribute("height", document.documentElement.clientHeight * 0.9 + "px");
	timer = setInterval(drawIt, 40);
}

function drawRegularPolygon(n) {
	ctx.clearRect(0, 0, c.width, c.height);
	// ctx.fillRect(0, c.height * 0.8, c.width, c.height * 0.2);
	ctx.beginPath();
	var angle = Math.PI * (n - 2) / n;
	var radius = 50;
	var r = radius * Math.sin(angle);
	var x = c.width / 2;
	var y = c.height / 2;
	ctx.moveTo(x, y);
	var theta = Math.PI;
	for (i = 0; i < n; i++) {
		ctx.lineTo(x + r * Math.cos(theta), y + r * Math.sin(theta));
		x += r * Math.cos(theta);
		y += r * Math.sin(theta);
		theta += Math.PI - angle;
	}
	ctx.stroke();
	ctx.beginPath();
	ctx.ellipse(c.width / 2, c.height / 2 - radius, 50, 50, 0, 0, Math.PI * 2);
	ctx.stroke();
}

function drawIt() {
	drawRegularPolygon(sides);
	sides++;
}