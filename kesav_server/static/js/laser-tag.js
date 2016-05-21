var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var width;
var height;
var wall_x;
var wall_y;
var wall_len;
var wall_dir;
var num_walls;
window.onload = start_game();

function start_game() {
	canvas.setAttribute("width", window.innerWidth * 0.8);
	canvas.setAttribute("height", window.innerHeight * 0.8);
	canvas.style.width = window.innerWidth * 0.8 + "px";
	canvas.style.height = window.innerHeight * 0.8 + "px";
	width = canvas.width;
	height = canvas.height;
	num_walls = 150;
	wall_x = [];
	wall_y = [];
	wall_len = [];
	wall_dir = [];
	for (i = 0; i < num_walls; i++) {
		wall_x[i] = 10 * ((Math.random() * width / 10) | 0);
		wall_y[i] = 10 * ((Math.random() * height / 10) | 0);
		wall_len[i] = (Math.random() * 11 + 5) | 0;
		wall_dir[i] = (Math.random() * 4) | 0;
	}
	paint();
}

function paint() {
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "#ffffff";
	ctx.strokeStyle = "#ffffff";
	// for (i = 0; i < width; i += 10) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(i, 0);
	// 	ctx.lineTo(i, height);
	// 	ctx.stroke();
	// }
	// for (i = 0; i < height; i += 10) {
	// 	ctx.beginPath();
	// 	ctx.moveTo(0, i);
	// 	ctx.lineTo(width, i);
	// 	ctx.stroke();
	// }
	for (a = 0; a < num_walls; a++) {
		var n = wall_dir[a];
		console.log	("here", wall_x[a], wall_y[a], wall_len[a], wall_dir[a]);
		switch (n) {
			case 0:
			for (i = wall_x[a]; i <= wall_x[a] + 10 * wall_len[a]; i += 10) {
				ctx.fillRect(i, wall_y[a], 10, 10);
			}
			break;
			case 1:
			for (i = wall_x[a]; i >= wall_x[a] - 10 * wall_len[a]; i -= 10) {
				ctx.fillRect(i, wall_y[a], 10, 10);
			}
			break;
			case 2:
			for (i = wall_y[a]; i <= wall_y[a] + 10 * wall_len[a]; i += 10) {
				ctx.fillRect(wall_x[a], i, 10, 10);
			}
			break;
			case 3:
			for (i = wall_y[a]; i >= wall_y[a] - 10 * wall_len[a]; i -= 10) {
				ctx.fillRect(wall_x[a], i, 10, 10);
			}
			break;
		}
	}
}