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
document.onload = start_game();
document.onkeydown = register_key_down;
document.onkeyup = register_key_up;
document.getElementById("mycanvas").onmousemove = register_mouse;

function start_game() {
	bounces = 0;
	running = false;
	ball_x = 500;
	ball_y = 350;
	velocity_x = 0;
	velocity_y = 0;
	mouse_x = 500;
	mouse_y = 350;
	paintComponent();
}

function register_key_down(e) {
	e.preventDefault();
	if (e.keyCode == 32 && !running) {
		launch();
		running = true;
	}
}

function register_key_up(e) {

}

function register_mouse(e) {
	console.log(e.clientX + " " + e.clientY);
	mouse_x = e.clientX;
	mouse_y = e.clientY;
	paintComponent();
}

function launch() {
	velocity_x = Math.random() * 40 - 20;
	velocity_y = Math.random() * 40 - 20;
	timer = setInterval(move_ball, 25);
}

function move_ball() {
	ball_x += velocity_x;
	ball_y += velocity_y;
	if (ball_x < 0 && velocity_x < 0) {
		if (bounces == 0) bounces++;
		else {
			bounces = 0;
			clearInterval(timer);
			running = false;
			ball_x = 500;
			ball_y = 350;
		}
		velocity_x *= -1;
	}
	if (ball_x > 990 && velocity_x > 0) {
		if (bounces == 0) bounces++;
		else {
			bounces = 0;
			clearInterval(timer);
			running = false;
			ball_x = 500;
			ball_y = 350;
		}
		velocity_x *= -1;
	}	
	if (ball_y < 0 && velocity_y < 0) {
		if (bounces == 0) bounces++;
		else {
			bounces = 0;
			clearInterval(timer);
			running = false;
			ball_x = 500;
			ball_y = 350;
		}
		velocity_y *= -1;
	}	
	if (ball_y > 690 && velocity_y > 0) {
		if (bounces == 0) bounces++;
		else {
			bounces = 0;
			clearInterval(timer);
			running = false;
			ball_x = 500;
			ball_y = 350;
		}
		velocity_y *= -1;
	}
	paintComponent();
}

function paintComponent() {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillStyle = "#000000";
	ctx.fillRect(450, 300, 100, 100);
	ctx.beginPath();
	ctx.ellipse(ball_x + 5, ball_y + 5, 5, 5, 0, 0, 2 * Math.PI);
	ctx.fill();
	if (!running) {
		ctx.beginPath();
		ctx.moveTo(500, 350);
		ctx.lineTo(mouse_x, mouse_y);
		ctx.stroke();
	}
}