var c = document.getElementById("mycanvas");
var ctx;
var width;
var height;
var squares;
var num_squares;
window.onload = start_game();
document.onkeydown = register_arrow;

function start_game() {
	c.setAttribute("width", window.innerHeight * 0.8);
	c.setAttribute("height", window.innerHeight * 0.8);
	c.style.width = window.innerHeight * 0.8 + "px";
	c.style.height = window.innerHeight * 0.8 + "px";
	width = c.width;
	height = c.height;
	ctx = c.getContext("2d");
	num_squares = 16;
	squares = new Array(num_squares);
	var s1 = (Math.random() * num_squares) | 0;
	var s2 = (Math.random() * num_squares) | 0;
	for (i = 0; i < num_squares; i++) {
		squares[i] = 0;
	}
	squares[s1] = 2;
	squares[s2] = 2;
	font_size = 48;
	paint();
}

function paint() {
	ctx.clearRect(0, 0, width, height);
	ctx.strokeStyle = "#ffffff";
	ctx.fillStyle = "#ffffff";
	ctx.lineWidth = 1;
	ctx.font = font_size + "px Arial";
	for (a = 0; a <= width; a += width / Math.pow(num_squares, 0.5)) {
		ctx.beginPath();
		ctx.moveTo(a, 0);
		ctx.lineTo(a, height);
		ctx.stroke();
	}
	for (a = 0; a <= height; a += height / Math.pow(num_squares, 0.5)) {
		ctx.beginPath();
		ctx.moveTo(0, a);
		ctx.lineTo(width, a);
		ctx.stroke();
	}
	var cnt = 0;
	for (a = width / (2 * Math.pow(num_squares, 0.5)); a < width; a += width / Math.pow(num_squares, 0.5)) {
		for (b = height / (2 * Math.pow(num_squares, 0.5)); b < height; b += height / Math.pow(num_squares, 0.5)) {
			if (squares[cnt] === 0) {
				cnt++;
				continue;
			}
			ctx.beginPath();
			ctx.fillText(squares[cnt] + "", a - 10, b + font_size / 2);
			ctx.fill();
			cnt++;
		}
	}
}

function register_arrow(e) {
	e.preventDefault();
	var n = e.which;
	switch (n) {
		case 37: fall(0); break;
		case 38: fall(1); break;
		case 39: fall(2); break;
		case 40: fall(3); break;
		default: return;
	}
}

function fall(n) {
	var cnt = 0;
	switch (n) {
		case 0:
		for (a = 0; a < Math.pow(num_squares, 0.5); a++) {
			for (b = 0; b < Math.pow(num_squares, 0.5); b++) {

			}
		}
	}
}