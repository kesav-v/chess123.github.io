var points = new Array();
var y_prime = "x^3";
var c = document.getElementById("graph-canvas");
var ctx = c.getContext('2d');
$(window).load(function() {
	c.style.width = (document.getElementById("entirepage").clientWidth * 0.6) + "px";
	c.style.height = (window.innerHeight * 0.6) + "px";
	c.width = c.clientWidth;
	c.height = c.clientHeight;
	calc_points(1, 0, 1, -15, 15);
	draw();
});

function calc_points(step, a, b, start, end) {
	var temp1 = a;
	var temp2 = b;
	var j = 0;
	while (a < end) {
		points[j] = [];
		points[j][0] = a;
		points[j][1] = b;
		var scope = {
			x: a,
			y: b
		}
		var m = math.eval(y_prime, scope);
		a += step;
		b += m * step;
		j++;
	}
	a = temp1;
	b = temp2;
	while (a > start) {
		points[j] = [];
		points[j][0] = a;
		points[j][1] = b;
		var scope = {
			x: a,
			y: b
		}
		var m = math.eval(y_prime, scope);
		a -= step;
		b -= m * step;
		j++;
	}
}

function point_to_pixel(a, b, x_min, x_max, y_min, y_max, width, height) {
	var x = (a - x_min) / (x_max - x_min) * width;
	var y = height * (1 - (a - y_min) / (y_max - y_min));
	return [x, y];
}

function pixel_to_point(x, y, x_min, x_max, y_min, y_max, width, height) {
	var a = x_min + x / width * (x_max - x_min);
	var b = y_min + (1 - y / height) * (y_max - y_min);
	return [a, b];
}

function draw() {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.strokeWidth = 5;
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(0, c.height / 2);
	ctx.lineTo(c.width, c.height / 2);
	ctx.stroke();
	ctx.moveTo(c.width / 2, 0);
	ctx.lineTo(c.width / 2, c.height);
	ctx.stroke();
	ctx.strokeWidth = 1;
	for (d = 0; d < points.length; d++) {
		var p1 = point_to_pixel(points[d][0], points[d][1], -15, 15, -10, 10, c.width, c.height);
		if (Math.abs(points[d][0]) < 2.5) console.log(p1);
		var x1 = p1[0];
		var y1 = p1[1];
		console.log(x1 + " " + y1);
		ctx.beginPath();
		ctx.ellipse(x1 + 0.5, y1 + 0.5, 1, 1, 0, 0, 2 * Math.PI);
		ctx.fill();
	}
}