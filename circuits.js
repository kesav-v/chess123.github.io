var canvas = document.getElementById("circuitcanvas");
var ctx = canvas.getContext('2d');
var resistors;
var capacitors;
var batteries;
var current;
var squares;
window.onload = init();

function init() {
	resistors = [];
	capacitors = [];
	batteries = [];
	current = 0;
	squares = [];
	for (i = 0; i < 69; i++) {
		squares.push([150 + 10 * i, 150]);
	}
	for (i = 0; i < 39; i++) {
		squares.push([840, 150 + 10 * i]);
	}
	for (i = 69; i > 0; i--) {
		squares.push([150 + 10 * i, 540]);
	}
	for (i = 39; i > 0; i--) {
		squares.push([150, 150 + 10 * i]);
	}
	paint_circuit();
}

function move_charge() {

}

function paint_circuit() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (a = 0; a < squares.length; a++) {
		ctx.beginPath();
		ctx.rect(squares[a][0], squares[a][1], 10, 10);
		ctx.stroke();
	}
}