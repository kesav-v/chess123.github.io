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
var portal_lefts_in;
var portal_tops_in;
var portal_lefts_out;
var portal_tops_out;
var numPortals;
var out_of_portal;
var num_portal_moves;
var colors;
var last_moved_direction;
var portals_visible;

function start_game() {
	portals_visible = false;
	num_portal_moves = 0;
	last_moved_direction = 0;
	out_of_portal = false;
	portal_lefts_in = new Array();
	portal_tops_in = new Array();
	portal_lefts_out = new Array();
	portal_tops_out = new Array();
	colors = new Array();
	clearInterval(timer);
	c = document.getElementById("mycanvas");
	ctx = c.getContext("2d");
	x_locations = new Array();
	y_locations = new Array();
	snake_x;
	snake_y;
	numFoods = 5;
	numPortals = 5;
	snake_parts = 1;
	initialize_locations();
	direction = 0;
	snake_lefts = new Array();
	snake_tops = new Array();
	place_snake();
	initialize_portals();
	document.onkeydown = register_key;
	moving = false;
	dead = false;
	score = 0;
	update_gradient();
	paintComponent();
}

function initialize_locations() {
	for (i = 0; i < numFoods; i++) {
		x_locations[i] = 10 * Math.floor(Math.random() * 99);
		y_locations[i] = 10 * Math.floor(Math.random() * 69);
	}
}

function update_gradient() {
	for (i = 0; i < snake_parts; i++) {
		colors[i] = Math.floor(i * 255.0 / snake_parts);
	}
}

function initialize_portals() {
	for (i = 0; i < numPortals; i++) {
		do {
			console.log("re-initializing");
			portal_lefts_in[i] = 10 * Math.floor(Math.random() * 99);
			portal_tops_in[i] = 10 * Math.floor(Math.random() * 69);
			portal_lefts_out[i] = 10 * Math.floor(Math.random() * 99);
			portal_tops_out[i] = 10 * Math.floor(Math.random() * 69);
		} while (close_to_others(i));
	}
}

function close_to_others(i) {
	var x2 = portal_lefts_in[i];
	var y2 = portal_tops_in[i];
	for (j = 0; j < i; j++) {
		console.log("checking " + j + " " + i);
		var x1 = portal_lefts_in[j];
		var y1 = portal_tops_in[j];
		if (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) < 50) return true;
		x1 = portal_lefts_out[j];
		y1 = portal_tops_out[j];
		if (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) < 50) return true;
	}
	x2 = portal_lefts_out[i];
	y2 = portal_tops_out[i];
	for (j = 0; j < i; j++) {
		console.log("checking2");
		var x1 = portal_lefts_in[j];
		var y1 = portal_tops_in[j];
		if (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) < 50) return true;
		x1 = portal_lefts_out[j];
		y1 = portal_tops_out[j];
		if (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) < 50) return true;
	}
	return false;
}

function register_key(e) {
	e.preventDefault();
	if (e.keyCode <= 40 && e.keyCode >= 37 && !moving) {
		moving = true;
		timer = setInterval(move_snake, 25);
	}
	if (e.keyCode > 40 || e.keyCode < 37) return;
	if (Math.abs(e.keyCode - 37 - last_moved_direction) == 2 && snake_parts != 1) {
		return;
	}
	else direction = e.keyCode - 37;
}

function place_snake() {
	snake_x = 10 * Math.floor(Math.random() * 99);
	snake_y = 10 * Math.floor(Math.random() * 69);
	snake_lefts[0] = snake_x;
	snake_tops[0] = snake_y;
}

function move_snake() {
	switch (direction) {
		case 1: snake_y -= 10; break;
		case 2: snake_x += 10; break;
		case 3: snake_y += 10; break;
		case 0: snake_x -= 10; break;
	}
	var col_index = collision();
	if (snake_y <= -10) snake_y = 700;
	else if (snake_y >= 700) snake_y = 0;
	if (snake_x <= -10) snake_x = 1000;
	else if (snake_x >= 1000) snake_x = 0;
	if (col_index != -1) {
		score += 10;
		x_locations[col_index] = 10 * Math.floor(Math.random() * 99);
		y_locations[col_index] = 10 * Math.floor(Math.random() * 69);
		snake_parts++;
		update_gradient();
	}
	if (out_of_portal) {
		num_portal_moves++;
		if (num_portal_moves == 3) {
			num_portal_moves = 0;
			out_of_portal = false;
		}
	}
	if (!out_of_portal) {
		for (i = 0; i < numPortals; i++) {
			if (Math.sqrt((portal_tops_in[i] + 10 - snake_y - 5) * (portal_tops_in[i] + 10 - snake_y - 5)
			 + (portal_lefts_in[i] + 10 - snake_x - 5) * (portal_lefts_in[i] + 10 - snake_x - 5)) <= 20) {
				snake_x = portal_lefts_out[i] + 10;
				snake_y = portal_tops_out[i] + 10;
				out_of_portal = true;
				direction = Math.floor(Math.random() * 4);
				switch (direction) {
					case 1: old_keyCode = 37; break;
					case 0: old_keyCode = 40; break;
					case 3: old_keyCode = 39; break;
					case 2: old_keyCode = 38; break;
				}
				break;
			}
			if (Math.sqrt((portal_tops_out[i] + 10 - snake_y - 5) * (portal_tops_out[i] + 10 - snake_y - 5)
			 + (portal_lefts_out[i] + 10 - snake_x - 5) * (portal_lefts_out[i] + 10 - snake_x - 5)) <= 20) {
				snake_x = portal_lefts_in[i] + 10;
				snake_y = portal_tops_in[i] + 10;
				out_of_portal = true;
				direction = Math.floor(Math.random() * 4);
				switch (direction) {
					case 1: old_keyCode = 37; break;
					case 0: old_keyCode = 40; break;
					case 3: old_keyCode = 39; break;
					case 2: old_keyCode = 38; break;
				}
				break;
			}
		}
	}
	for (i = snake_parts - 1; i > 0; i--) {
		snake_lefts[i] = snake_lefts[i - 1];
		snake_tops[i] = snake_tops[i - 1];
	}
	snake_lefts[0] = snake_x;
	snake_tops[0] = snake_y;
	if (duplicates()) {
		ctx.font = "48px Comic Sans MS";
		ctx.fillStyle = "#009900";
		if (score > high_score) {
			high_score = score;
			ctx.fillText("NEW BEST!", 350, 350);
		}
		else ctx.fillText("GAME OVER", 350, 350);
		ctx.fillStyle = "#0000ff";
		ctx.fillText("High score: " + high_score, 350, 420);
		clearInterval(timer);
		dead = true;
		return;
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
	last_moved_direction = direction;
	ctx.fillStyle = "#000000";
	for (i = 0; i < x_locations.length; i++) {
		ctx.fillRect(x_locations[i], y_locations[i], 10, 10);
	}
	if (portals_visible) {
		ctx.strokeStyle = "#009900";
		for (i = 0; i < numPortals; i++) {
			ctx.beginPath();
			ctx.ellipse(portal_lefts_in[i] + 10, portal_tops_in[i] + 10, 10, 10, 0, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.ellipse(portal_lefts_out[i] + 10, portal_tops_out[i] + 10, 10, 10, 0, 0, 2 * Math.PI);
			ctx.stroke();
		}
	}
	ctx.strokeStyle = "#ff0000";
	ctx.fillStyle = "#ff0000";
	for (i = 0; i < snake_parts; i++) {
		ctx.fillStyle = "rgb(0, " + colors[i] + ", " + (255 - colors[i]) + ")";
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