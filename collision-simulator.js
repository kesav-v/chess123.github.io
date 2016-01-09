var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
ctx.setAttribute("width", $(c).width());
ctx.setAttribute("height", $(c).height());
console.log($(c).width());
var ball_x;
var ball_y;
var velocity_x;
var velocity_y;
var numBalls;
var mass;
start_simulation();

function start_simulation() {
	numBalls = 10;
	ball_x = new Array();
	ball_y = new Array();
	velocity_x = new Array();
	velocity_y = new Array();
	mass = new Array();
	for (i = 0; i < numBalls; i++) {
		ball_x[i] = Math.random() * 1000;
		ball_y[i] = Math.random() * 700;
		velocity_x[i] = Math.random() * 20 - 10;
		velocity_y[i] = Math.random() * 20 - 10;
		mass[i] = 10;
	}
	var timer = setInterval(move_ball, 5);
	paintComponent();
}

function move_ball() {
	for (i = 0; i < numBalls; i++) {
		ball_x[i] += velocity_x[i] / 5;
		ball_y[i] += velocity_y[i] / 5;
		if (ball_x[i] < 0 && velocity_x[i] < 0) velocity_x[i] *= -1; 
		if (ball_y[i] < 0 && velocity_y[i] < 0) velocity_y[i] *= -1;
		if (ball_x[i] + 10 > 1000 && velocity_x[i] > 0) velocity_x[i] *= -1; 
		if (ball_y[i] + 10 > 700 && velocity_y[i] > 0) velocity_y[i] *= -1;
		var col_index = check_collision(i);
		if (col_index != -1) {
			var temp1 = velocity_x[i];
			var temp2 = velocity_y[i];
			velocity_x[i] = ((mass[i] * velocity_x[i] + 2 * mass[col_index] * velocity_x[col_index] - mass[col_index] * velocity_x[i]) / (mass[i] + mass[col_index]));
			velocity_y[i] = ((mass[i] * velocity_y[i] + 2 * mass[col_index] * velocity_y[col_index] - mass[col_index] * velocity_y[i]) / (mass[i] + mass[col_index]));
			velocity_x[col_index] = ((2 * mass[i] * temp1 + mass[col_index] * velocity_x[col_index] - mass[i] * velocity_x[col_index]) / (mass[i] + mass[col_index]));
			velocity_y[col_index] = ((2 * mass[i] * temp2 + mass[col_index] * velocity_y[col_index] - mass[i] * velocity_y[col_index]) / (mass[i] + mass[col_index]));
			paintComponent();
		}
	}
	paintComponent();
}

function kinetic_energy() {
	var sum = 0;
	for (i = 0; i < numBalls; i++) {
		var speed = Math.sqrt(velocity_x[i] * velocity_x[i] + velocity_y[i] * velocity_y[i]);
		sum += speed * speed * mass[i] / 2;
	}
	return sum;
}

function check_collision(i) {
	for (j = i - 1; j >= 0; j--) {
		if (Math.sqrt((ball_x[i] - ball_x[j]) * (ball_x[i] - ball_x[j]) + (ball_y[i] - ball_y[j]) * (ball_y[i] - ball_y[j])) <= 20) return j;
	}
	return -1;
}

function paintComponent() {
	ctx.clearRect(0, 0, c.width, c.height);
	ctx.fillStyle = "#ff0000";
	for (i = 0; i < numBalls; i++) {
		ctx.beginPath();
		ctx.ellipse(ball_x[i] + 5, ball_y[i] + 5, 5, 5, 0, 0, 2 * Math.PI);
		ctx.fill();
	}
	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.font = "48px Comic Sans MS";
	ctx.fillText("Total Kinetic Energy: " + kinetic_energy(), 2, 50);
}