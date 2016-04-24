var c;
var ctx;
var x_locations;
var y_locations;
var sim_x_locations;
var sim_y_locations;
var snake_x;
var snake_y;
var sim_snake_x;
var sim_snake_y;
var numFoods;
var snake_parts;
var sim_snake_parts;
var direction;
var snake_lefts;
var snake_tops;
var moving;
var timer;
var dead;
var score;
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
var games;
var move_wall;
var wall_x, wall_y;
var vx, vy;
var radius;
var times;
var temp_score;
window.onload = start_game();

function start_game() {
	for (i = 0; true; i++) {
		if (localStorage.getItem("aigame" + i) === null) break;
	}
	games = i;
	times = 0;
	temp_score = 0;
	radius = 25;
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
	clearInterval(move_wall);
	c = document.getElementById("mycanvas");
	ctx = c.getContext("2d");
	x_locations = new Array();
	y_locations = new Array();
	snake_x;
	snake_y;
	wall_x = new Array();
	wall_y = new Array();
	wall_x[0] = Math.random() * c.width | 0;
	wall_y[0] = Math.random() * c.height | 0;
	vx = new Array();
	vy = new Array();
	vx[0] = 1;
	vy[0] = 1;
	numFoods = 100;
	numPortals = 0;
	snake_parts = 1;
	initialize_locations();
	direction = 0;
	snake_lefts = new Array();
	snake_tops = new Array();
	place_snake();
	initialize_portals();
	// document.onkeydown = register_key;
	moving = false;
	dead = false;
	score = 0;
	update_gradient();
	paintComponent();
	setTimeout(begin, 3000);
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
		var x1 = portal_lefts_in[j];
		var y1 = portal_tops_in[j];
		if (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) < 50) return true;
		x1 = portal_lefts_out[j];
		y1 = portal_tops_out[j];
		if (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) < 50) return true;
	}
	return false;
}

function calculate_best_direction() {
	var max_distance = 0;
	var max_x = x_locations[0];
	var max_y = y_locations[0];
	for (i = 0; i < numFoods; i++) {
		var dist = 0;
		for (j = 0; j < wall_x.length; j++) {
			dist += Math.sqrt(Math.pow(x_locations[i] - wall_x[j], 2) + Math.pow(y_locations[i] - wall_y[j], 2));
		}
		if (dist > max_distance) {
			max_distance = dist;
			max_x = x_locations[i];
			max_y = y_locations[i];
		}
	}
	if (max_y < snake_y && direction != 3) {
		var movable = true;
		for (u = 1; u < snake_parts; u++) {
			if (snake_y - 10 == snake_tops[u]) movable = false;
		}
		for (u = 0; u < wall_x.length; u++) {
			var d = Math.sqrt(Math.pow(snake_x - (wall_x[u] + vx[u]), 2) + Math.pow(snake_y - 10 - (wall_y[u] + vy[u])), 2);
			if (d <= radius) movable = false;
		}
		if (movable) return 1;
	}
	if (max_y > snake_y && direction != 1) {
		var movable = true;
		for (u = 1; u < snake_parts; u++) {
			if (snake_y + 10 == snake_tops[u]) movable = false;
		}
		for (u = 0; u < wall_x.length; u++) {
			var d = Math.sqrt(Math.pow(snake_x - (wall_x[u] + vx[u]), 2) + Math.pow(snake_y + 10 - (wall_y[u] + vy[u])), 2);
			if (d <= radius) movable = false;
		}
		if (movable) return 3;
	}
	if (max_x < snake_x && direction != 2) {
		var movable = true;
		for (u = 1; u < snake_parts; u++) {
			if (snake_x - 10 == snake_lefts[u]) movable = false;
		}
		for (u = 0; u < wall_x.length; u++) {
			var d = Math.sqrt(Math.pow(snake_x - 10 - (wall_x[u] + vx[u]), 2) + Math.pow(snake_y - (wall_y[u] + vy[u])), 2);
			if (d <= radius) movable = false;
		}
		if (movable) return 0;
	}
	if (max_x > snake_x && direction != 0) {
		var movable = true;
		for (u = 1; u < snake_parts; u++) {
			if (snake_x + 10 == snake_lefts[u]) movable = false;
		}
		for (u = 0; u < wall_x.length; u++) {
			var d = Math.sqrt(Math.pow(snake_x + 10 - (wall_x[u] + vx[u]), 2) + Math.pow(snake_y - (wall_y[u] + vy[u])), 2);
			if (d <= radius) movable = false;
		}
		if (movable) return 2;
	}
	var walls_right = 0, walls_up = 0;
	for (v = 0; v < wall_x.length; v++) {
		walls_right += snake_x - wall_x[v];
		walls_up += snake_y - wall_y[v];
	}
	if (walls_right < 0 && direction != 2) return 0;
	if (walls_right > 0 && direction != 0) return 2;
	if (walls_up < 0 && direction != 3) return 1;
	if (walls_up > 0 && direction != 1) return 3;
	return direction;
}

function better_direction() {
	var zero, one, two, three;
	zero = one = two = three = true;
	var n = direction;
	if (n == 0) two = false;
	if (n == 1) three = false;
	if (n == 2) zero = false;
	if (n == 3) one = false;
	for (u = 1; u < snake_parts; u++) {
		if (snake_x + 10 == snake_lefts[u]) two = false;
	}
	for (u = 0; u < wall_x.length; u++) {
		var temp = snake_x + 10;
		if (temp < 0) temp = 1000;
		if (temp >= 1000) temp = 0;
		var d = Math.sqrt(Math.pow(temp - (wall_x[u] + vx[u]), 2) + Math.pow(snake_y - (wall_y[u] + vy[u])), 2);
		if (d <= radius + 40) two = false;
	}
	for (u = 1; u < snake_parts; u++) {
		if (snake_x - 10 == snake_lefts[u]) zero = false;
	}
	for (u = 0; u < wall_x.length; u++) {
		var temp = snake_x - 10;
		if (temp < 0) temp = 1000;
		if (temp >= 1000) temp = 0;
		var d = Math.sqrt(Math.pow(temp - (wall_x[u] + vx[u]), 2) + Math.pow(snake_y - (wall_y[u] + vy[u])), 2);
		if (d <= radius + 40) zero = false;
	}
	for (u = 1; u < snake_parts; u++) {
		if (snake_y + 10 == snake_tops[u]) three = false;
	}
	for (u = 0; u < wall_x.length; u++) {
		var temp = snake_y + 10;
		if (temp <= 0) temp = 700;
		if (temp > 700) temp = 0;
		var d = Math.sqrt(Math.pow(temp - (wall_y[u] + vy[u]), 2) + Math.pow(snake_x - (wall_x[u] + vx[u])), 2);
		if (d <= radius + 40) three = false;
	}
	for (u = 1; u < snake_parts; u++) {
		if (snake_y - 10 == snake_tops[u]) one = false;
	}
	for (u = 0; u < wall_x.length; u++) {
		var temp = snake_y - 10;
		if (temp <= 0) temp = 700;
		if (temp > 700) temp = 0;
		var d = Math.sqrt(Math.pow(temp - (wall_y[u] + vy[u]), 2) + Math.pow(snake_x - (wall_x[u] + vx[u])), 2);
		if (d <= radius + 40) one = false;
	}
	if (!zero && !one && !two && !three) {
		console.log("No choice");
		return (Math.random() * 4) | 0;
	}
	var possible = [];
	if (zero) possible.push(0);
	if (one) possible.push(1);
	if (two) possible.push(2);
	if (three) possible.push(3);
	if (possible.length == 1) return possible[0];
	// //console.log(possible);
	var max_distance = 0;
	var max_x = x_locations[0];
	var max_y = y_locations[0];
	for (i = 0; i < numFoods; i++) {
		var dist = 0;
		for (j = 0; j < wall_x.length; j++) {
			dist += Math.sqrt(Math.pow(x_locations[i] - wall_x[j], 2) + Math.pow(y_locations[i] - wall_y[j], 2));
		}
		if (dist > max_distance) {
			max_distance = dist;
			max_x = x_locations[i];
			max_y = y_locations[i];
		}
	}
	if (max_x < snake_x && zero) return 0;
	if (max_x > snake_x && two) return 2;
	if (max_y < snake_y && one) return 1;
	if (max_y > snake_y && three) return 3;
	//console.log("Finding relative best for " + max_x + ", " + max_y);
	var min_val = 100000000000000000;
	var best_dir;
	for (u = 0; u < possible.length; u++) {
		var dir = possible[u];
		var score = 0;
		if (dir == 0) {
			for (v = 0; v < wall_x.length; v++) {
				var temp = snake_x - 10;
				if (temp < 0) temp = 1000;
				if (temp >= 1000) temp = 0;
				score += 10000 / Math.sqrt(Math.pow(temp - wall_x[v] - vx[v], 2) + Math.pow(snake_y - wall_y[v] - vy[v], 2));
			}
		}
		if (dir == 1) {
			for (v = 0; v < wall_x.length; v++) {
				var temp = snake_y - 10;
				if (temp <= 0) temp = 700;
				if (temp > 700) temp = 0;
				score += 10000 / Math.sqrt(Math.pow(temp - wall_y[v] - vy[u], 2) + Math.pow(snake_x - wall_x[v] - vx[v], 2));
			}
		}
		if (dir == 2) {
			for (v = 0; v < wall_x.length; v++) {
				var temp = snake_x + 10;
				if (temp < 0) temp = 1000;
				if (temp >= 1000) temp = 0;
				score += 10000 / Math.sqrt(Math.pow(temp - wall_x[v] - vx[v], 2) + Math.pow(snake_y - wall_y[v] - vy[v], 2));
			}
		}
		if (dir == 3) {
			for (v = 0; v < wall_x.length; v++) {
				var temp = snake_y + 10;
				if (temp <= 0) temp = 700;
				if (temp > 700) temp = 0;
				score += 10000 / Math.sqrt(Math.pow(temp - wall_y[v] - vy[v], 2) + Math.pow(snake_x - wall_x[v] - vx[v], 2));
			}
		}
		if (score < min_val) {
			min_val = score;
			best_dir = dir;
		}
	}
	return best_dir;
}

function begin() {
	moving = true;
	timer = setInterval(move_snake, 25);
	move_wall = setInterval(move_red, 25);
}

function register_key(e) {
	e.preventDefault();
	if (e.keyCode <= 40 && e.keyCode >= 37 && !moving) {
		moving = true;
		timer = setInterval(move_snake, 25);
		move_wall = setInterval(move_red, 25);
	}
	if (e.keyCode > 40 || e.keyCode < 37) return;
	if (Math.abs(e.keyCode - 37 - last_moved_direction) == 2 && snake_parts != 1) {
		return;
	}
	else direction = e.keyCode - 37;
}

function move_red() {
	times++;
	if (times % 1000 == 0) {
		var n = wall_x.length;
		for (a = 0; a < n; a++) {
			var tx = wall_x[a];
			var ty = wall_y[a];
			var tvx = vx[a] * 2;
			var tvy = vy[a] * 2;
			wall_x[wall_x.length] = tx;
			wall_y[wall_y.length] = ty;
			vx[vx.length] = tvx;
			vy[vy.length] = tvy;
		}
		radius /= 2;
	}
	else if (times % 40 == 0) {
		radius++;
		for (p = 0; p < wall_x.length; p++) {
			vx[p] /= 1.2;
			vy[p] /= 1.2;
		}
	}
	for (p = 0; p < wall_x.length; p++) {		
		vx[p] += 1 / Math.sqrt(wall_x.length) * (1 - Math.random() * 2);
		vy[p] += 1 / Math.sqrt(wall_x.length) * (1 - Math.random() * 2);
		wall_x[p] += vx[p];
		wall_y[p] += vy[p];
		if (wall_x[p] < 0 && vx[p] < 0 || wall_x[p] > c.width - radius && vx[p] > 0) vx[p] *= -1;
		if (wall_y[p] < 0 && vy[p] < 0 || wall_y[p] > c.height - radius && vy[p] > 0) vy[p] *= -1;
		for (q = 0; q < snake_lefts.length; q++) {
			if (Math.sqrt(Math.pow(snake_lefts[q] - wall_x[p], 2) + Math.pow(snake_tops[q] - wall_y[p], 2)) < radius) {
				if (q == 0) {
					clearInterval(timer);
					clearInterval(move_wall);
					dead = true;
					snake_parts = 0;
					paintComponent();
					return;
				}
				snake_lefts.splice(q, snake_lefts.length - q + 1);
				snake_tops.splice(q, snake_tops.length - q + 1);
				snake_parts = snake_lefts.length;
				temp_score = 10 * (snake_parts - 1);
				update_gradient();
				paintComponent();
				break;
			}
		}
	}
	paintComponent();
}

function place_snake() {
	do {
		snake_x = 10 * Math.floor(Math.random() * 99);
		snake_y = 10 * Math.floor(Math.random() * 69);
	} while (Math.sqrt(Math.pow(snake_x - wall_x[0], 2) + Math.pow(snake_y - wall_y[0], 2)) < 100);
	snake_lefts[0] = snake_x;
	snake_tops[0] = snake_y;
}

function move_snake() {
	// direction = calculate_best_direction();
	direction = better_direction();
	var about_to_crash = false;
	for (b = 0; b < wall_x.length; b++) {
		if (direction == 0 && Math.sqrt(Math.pow(snake_x - 10 - (wall_x[b] + vx[b]), 2) + Math.pow(snake_y - (wall_y[b] + vy[b]), 2)) <= radius) about_to_crash = true;
		if (direction == 2 && Math.sqrt(Math.pow(snake_x + 10 - (wall_x[b] + vx[b]), 2) + Math.pow(snake_y - (wall_y[b] + vy[b]), 2)) <= radius) about_to_crash = true;
		if (direction == 1 && Math.sqrt(Math.pow(snake_y - 10 - (wall_y[b] + vy[b]), 2) + Math.pow(snake_x - (wall_x[b] + vx[b]), 2)) <= radius) about_to_crash = true;
		if (direction == 3 && Math.sqrt(Math.pow(snake_y + 10 - (wall_y[b] + vy[b]), 2) + Math.pow(snake_x - (wall_x[b] + vx[b]), 2)) <= radius) about_to_crash = true;
	}
	if (about_to_crash) direction++;
	direction %= 4;
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
		if (score == temp_score) {
			temp_score += 10 * wall_x.length;
			score += 10 * wall_x.length;
		}
		else temp_score += 10 * wall_x.length;
		if (temp_score > score) score = temp_score;
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
		ctx.font = "48px Lucida Sans Unicode";
		ctx.fillStyle = "#009900";
		var high_score = 0;
		for (i = 0; i < games; i++) {
			if (parseInt(localStorage.getItem("aigame" + i)) > high_score)
				high_score = parseInt(localStorage.getItem("aigame" + i));
		}
		if (score > high_score) {
			high_score = score;
			ctx.fillText("NEW BEST!", 350, 350);
			localStorage.setItem("aigame" + games, String(score));
			games++;
		}
		else ctx.fillText("GAME OVER", 350, 350);
		ctx.fillStyle = "#0000ff";
		ctx.fillText("High score: " + high_score, 350, 420);
		clearInterval(timer);
		clearInterval(move_wall);
		dead = true;
		setTimeout(start_game, 3000);
		//console.log("SETTING TIMER");
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
		if (snake_lefts[j] == snake_x && snake_tops[j] == snake_y) return true;
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
	for (i = 0; i < wall_x.length; i++) {
		ctx.beginPath();
		ctx.ellipse(wall_x[i], wall_y[i], radius, radius, 0, 0, 2 * Math.PI);
		ctx.fill();
	}
	for (i = 0; i < snake_parts; i++) {
		ctx.fillStyle = "rgb(" + colors[i] + ", " + colors[i] + ", " + 255 + ")";
		// ctx.beginPath();
		// ctx.ellipse(snake_lefts[i] + 5, snake_tops[i] + 5, 5, 5, 0, 0, 2 * Math.PI);
		// ctx.fill();
		ctx.fillRect(snake_lefts[i], snake_tops[i], 10, 10);
	}
	ctx.font = "48px Lucida Sans Unicode";
	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.fillText("Score: " + score, 50, 50);
	if (dead) {
		ctx.font = "48px Lucida Sans Unicode";
		ctx.fillStyle = "#009900";
		var high_score = 0;
		for (i = 0; i < games; i++) {
			if (parseInt(localStorage.getItem("aigame" + i)) > high_score)
				high_score = parseInt(localStorage.getItem("aigame" + i));
		}
		if (score > high_score) {
			high_score = score;
			ctx.fillText("NEW BEST!", 350, 350);
			localStorage.setItem("aigame" + games, String(score));
			games++;
		}
		else ctx.fillText("GAME OVER", 350, 350);
		ctx.fillStyle = "#0000ff";
		ctx.fillText("High score: " + high_score, 350, 420);
		setTimeout(start_game, 3000);
		//console.log("SETTING TIMER");
	}
}