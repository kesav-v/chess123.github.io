var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
var ball_x;
var ball_y;
var velocity_x;
var velocity_y;
var mouse_x;
var mouse_y;
var timer;
var running;
var bounces;
var angle;
var moving_angle;
var angle_timer;
var red_ball;
var enemy_x;
var enemy_y;
var num_enemies;
var ball_color;
document.onload = start_game();
document.onkeydown = register_key_down;
document.onkeyup = register_key_up;

function start_game() {
	enemy_x = new Array();
	enemy_y = new Array();
	num_enemies = 10;
	for (i = 0; i < num_enemies; i++) {
		do {
			enemy_x[i] = 960 * Math.random() + 20;
			enemy_y[i] = 660 * Math.random() + 20;
		} while (enemy_x[i] < 550 && enemy_x[i] > 450 &&
				enemy_y[i] > 300 && enemy_y[i] < 400);
	}
	moving_angle = false;
	bounces = 0;
	running = false;
	ball_x = 500;
	ball_y = 350;
	velocity_x = 0;
	velocity_y = 0;
	mouse_x = 500;
	mouse_y = 350;
	angle = 0;
	ball_color = "#000000";
	paintComponent();
}

function register_key_down(e) {
	if (e.keyCode == 32 && !running) {
		e.preventDefault();
		launch();
		running = true;
	}
	if (e.keyCode == 37 && !moving_angle) {
		moving_angle = true;
		angle_timer = setInterval(increase_angle, 5);
	}
	if (e.keyCode == 39 && !moving_angle) {
		moving_angle = true;
		angle_timer = setInterval(decrease_angle, 5);
	}
}

function register_key_up(e) {
	clearInterval(angle_timer);
	moving_angle = false;
}

function register_mouse(e) {
	mouse_x = e.clientX;
	mouse_y = e.clientY;
	paintComponent();
}

function launch() {
	velocity_x = 30 * Math.cos(angle);
	velocity_y = -30 * Math.sin(angle);
	timer = setInterval(move_ball, 10);
}

function move_ball() {
	ball_x += velocity_x / 2.5;
	ball_y += velocity_y / 2.5;
	for (n = 0; n < num_enemies; n++) {
		if (ball_color !== "#000000" && Math.sqrt(Math.pow(ball_x + 5 - enemy_x[n], 2) + Math.pow(ball_y + 5 - enemy_y[n], 2)) <= 15) {
			enemy_x[n] = -100;
			enemy_y[n] = -100;
			bounces = 0;
			clearInterval(timer);
			running = false;
			ball_x = 500;
			ball_y = 350;
			ball_color = "#000000";
		}
	}
	if (ball_x < 0 && velocity_x < 0) {
		if (bounces == 0) {
			bounces++;
			ball_color = "#00ff00";
		}
		else {
			bounces = 0;
			clearInterval(timer);
			running = false;
			ball_x = 500;
			ball_y = 350;
			ball_color = "#000000";
		}
		velocity_x *= -1;
	}
	if (ball_x > 990 && velocity_x > 0) {
		if (bounces == 0) {
			bounces++;
			ball_color = "#ff0000";
		}		
		else {
			bounces = 0;
			clearInterval(timer);
			running = false;
			ball_x = 500;
			ball_y = 350;
			ball_color = "#000000";
		}
		velocity_x *= -1;
	}	
	if (ball_y < 0 && velocity_y < 0) {
		if (bounces == 0) {
			bounces++;
			ball_color = "#0000ff";
		}		
		else {
			bounces = 0;
			clearInterval(timer);
			running = false;
			ball_x = 500;
			ball_y = 350;
			ball_color = "#000000";
		}
		velocity_y *= -1;
	}	
	if (ball_y > 690 && velocity_y > 0) {
		if (bounces == 0) {
			bounces++;
			ball_color = "#ffff00";
		}		
		else {
			bounces = 0;
			clearInterval(timer);
			running = false;
			ball_x = 500;
			ball_y = 350;
			ball_color = "#000000";
		}
		velocity_y *= -1;
	}
	paintComponent();
}

function increase_angle() {
	angle += 0.1 / 6;
	angle %= 2 * Math.PI;
	paintComponent();
}

function decrease_angle() {
	angle -= 0.1 / 6;
	angle %= 2 * Math.PI;
	paintComponent();
}

function paintComponent() {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillStyle = "#000000";
	ctx.fillRect(450, 300, 100, 100);
	ctx.beginPath();
	ctx.fillStyle = ball_color;
	ctx.ellipse(ball_x + 5, ball_y + 5, 5, 5, 0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.strokeStyle = "#0000ff";
	ctx.beginPath();
	ctx.moveTo(500, 350);
	ctx.lineTo(500 + 200 * Math.cos(angle), 350 - 200 * Math.sin(angle));
	ctx.stroke();
	ctx.fillStyle = "#00ff00";
	for (k = 0; k < num_enemies; k++) {
		ctx.beginPath();
		ctx.ellipse(enemy_x[k], enemy_y[k], 10, 10, 0, 0, 2 * Math.PI);
		ctx.fill();
	}
}