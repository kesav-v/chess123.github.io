start_game();
var c;
var ctx;
var x_locations;
var y_locations;
var snake_x;
var snake_y;
var numFoods;
var snake_parts;
var direction;
var snake_lefts;
var snake_tops;
var moving;
var timer;
var dead;
var score;
var high_score = 0;

function start_game() {
	c = document.getElementById("mycanvas");
	ctx = c.getContext("2d");
	x_locations = new Array();
	y_locations = new Array();
	snake_x;
	snake_y;
	numFoods = 5;
	snake_parts = 1;
	initialize_locations();
	direction = 0;
	snake_lefts = new Array();
	snake_tops = new Array();
	place_snake();
	document.onkeydown = register_key;
	moving = false;
	dead = false;
	score = 0;
	paintComponent();
}

function initialize_locations() {
	for (i = 0; i < numFoods; i++) {
		x_locations[i] = 10 * Math.floor(Math.random() * 99);
		y_locations[i] = 10 * Math.floor(Math.random() * 69);
	}
}

function register_key(e) {
	if (e.keyCode <= 76 && e.keyCode >= 73 && !moving) {
		moving = true;
		timer = setInterval(move_snake, 25);
	}
	switch (e.keyCode) {
		case 73: direction = 0; break;
		case 74: direction = 3; break;
		case 75: direction = 2; break;
		case 76: direction = 1; break;
	}
}

function place_snake() {
	snake_x = 10 * Math.floor(Math.random() * 99);
	snake_y = 10 * Math.floor(Math.random() * 69);
	snake_lefts[0] = snake_x;
	snake_tops[0] = snake_y;
}

function move_snake() {
	console.log(direction);
	switch (direction) {
		case 0: snake_y -= 10; break;
		case 1: snake_x += 10; break;
		case 2: snake_y += 10; break;
		case 3: snake_x -= 10; break;
	}
	var col_index = collision();
	if (snake_y <= 0) snake_y = 700;
	else if (snake_y >= 700) snake_y = 0;
	if (snake_x <= 0) snake_x = 1000;
	else if (snake_x >= 1000) snake_x = 0;
	if (col_index != -1) {
		score += 10;
		x_locations[col_index] = 10 * Math.floor(Math.random() * 99);
		y_locations[col_index] = 10 * Math.floor(Math.random() * 69);
		snake_parts++;
	}
	for (i = snake_parts - 1; i > 0; i--) {
		snake_lefts[i] = snake_lefts[i - 1];
		snake_tops[i] = snake_tops[i - 1];
	}
	snake_lefts[0] = snake_x;
	snake_tops[0] = snake_y;
	if (duplicates()) {
		clearInterval(timer);
		dead = true;
	}
	paintComponent();
}

function duplicates() {
	for (j = i + 1; j < snake_parts; j++) {
		// if (snake_lefts[j] > snake_lefts[i] && snake_lefts[j] < snake_lefts[i] + 10 && snake_tops[j] > snake_tops[i] && snake_tops[j] < snake_tops[i] + 10) return true;
		// if (snake_lefts[j] + 10 > snake_lefts[i] && snake_lefts[j] + 10 < snake_lefts[i] + 10 && snake_tops[j] > snake_tops[i] && snake_tops[j] < snake_tops[i] + 10) return true;
		// if (snake_lefts[j] > snake_lefts[i] && snake_lefts[j] < snake_lefts[i] + 10 && snake_tops[j] + 10 > snake_tops[i] && snake_tops[j] + 10 < snake_tops[i] + 10) return true;
		// if (snake_lefts[j] + 10 > snake_lefts[i] && snake_lefts[j] + 10 < snake_lefts[i] + 10 && snake_tops[j] + 10 > snake_tops[i] && snake_tops[j] + 10 < snake_tops[i] + 10) return true;
		if (snake_lefts[j] == snake_lefts[0] && snake_tops[j] == snake_tops[0]) return true;
	}
	return false;
}

function collision() {
	for (i = 0; i < x_locations.length; i++) {
		if (snake_x >= x_locations[i] && snake_x <= x_locations[i] + 10 && snake_y >= y_locations[i] && snake_y <= y_locations[i] + 10) return i;
		if (snake_x + 10 >= x_locations[i] && snake_x + 10 <= x_locations[i] + 10 && snake_y >= y_locations[i] && snake_y <= y_locations[i] + 10) return i;
		if (snake_x >= x_locations[i] && snake_x <= x_locations[i] + 10 && snake_y + 10 >= y_locations[i] && snake_y + 10 <= y_locations[i] + 10) return i;
		if (snake_x + 10 >= x_locations[i] && snake_x + 10 <= x_locations[i] + 10 && snake_y + 10 >= y_locations[i] && snake_y + 10 <= y_locations[i] + 10) return i;
	}
	return -1;
}

function paintComponent() {
	ctx.clearRect(0, 0, c.width, c.height);
	console.log("REPAINTING");
	ctx.fillStyle = "#000000";
	for (i = 0; i < x_locations.length; i++) {
		ctx.fillRect(x_locations[i], y_locations[i], 10, 10);
	}
	ctx.strokeStyle = "#ff0000";
	ctx.fillStyle = "#ff0000";
	for (i = 0; i < snake_parts; i++) {
		if (i == 0) ctx.fillStyle = "#0000ff";
		else ctx.fillStyle = "#ff0000";
		ctx.beginPath();
		ctx.ellipse(snake_lefts[i] + 5, snake_tops[i] + 5, 5, 5, 0, 0, 2 * Math.PI);
		ctx.fill();
	}
	ctx.font = "48px Comic Sans MS";
	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.fillText("Score: " + score, 50, 50);
	if (dead) {
		ctx.font = "48px Comic Sans MS";
		ctx.fillStyle = "#009900";
		if (score > high_score) {
			high_score = score;
			ctx.fillText("NEW BEST!", 350, 350);
		}
		else ctx.fillText("GAME OVER", 350, 350);
		ctx.fillStyle = "#0000ff";
		ctx.fillText("High score: " + high_score, 350, 420);
	}
}