var charge_x;
var charge_y;
var charge_val;
var numCharges;
var space;
var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("arrowimg");
img.onload = start_sim();

function start_sim() {
	setTimeout(paintComponent, 100);
	charge_x = new Array();
	charge_y = new Array();
	charge_val = new Array();
	numCharges = 3;
	space = 20;
	for (i = 0; i < numCharges; i++) {
		do {
			charge_x[i] = (Math.random() * 20 - 10) | 0;
			charge_y[i] = (Math.random() * 20 - 10) | 0;
		} while(found(charge_x[i], charge_y[i], i));
		charge_val[i] = (Math.random() * 20 - 10);
		console.log("Charge #" + (i + 1) + ": (" + charge_x[i] + ", " + charge_y[i] + ") with q = " + charge_val[i] + " C");
	}
	// paintComponent();
	// document.getElementById("arrowimg").onload = paintComponent();
}

function found(x, y, ind) {
	for (n = 0; n < ind; n++) {
		if (charge_x[n] == x && charge_y[n] == y) return true;
	}
	return false;
}

function paintComponent() {
	ctx.clearRect(0, 0, c.width, c.height);
	for (a = 0; a < 1000; a += space) {
		for (j = 0; j < 700; j += space) {
			// ctx.save();
			var field = get_field((a + space / 2 - 500) / 50, (j + space / 2 - 350) / -35);
			if (field[2] > 5) {
				ctx.fillStyle = "rgba(0, 255, 0, 1)";
				ctx.strokeStyle = "rgba(0, 255, 0, 1)";
			}
			else {
				var alpha = Math.pow(field[2] / 5, 0.4);
				ctx.fillStyle = "rgba(0, 255, 0, " + alpha + ")";
				ctx.strokeStyle = "rgba(0, 255, 0, " + alpha + ")";				
			}
			// var angle = Math.atan(field[1] / field[0]);
			// if (field[0] < 0) angle += Math.PI;
			// ctx.rotate(angle);
			// var a1 = a * Math.cos(angle) + j * Math.sin(angle);
			// var j1 = -a * Math.sin(angle) + j * Math.cos(angle);
			// var a2 = (a + space) * Math.cos(angle) + j * Math.sin(angle);
			// var j2 = -a * Math.sin(angle) + (j + space) * Math.cos(angle);
			// ctx.drawImage(img, a1, j1, a2 - a1, j2 - j1);
			// ctx.beginPath();
			// ctx.rect(a1, j1, a2 - a1, j2 - j1);
			// ctx.stroke();
			// ctx.restore();
			ctx.beginPath();
			ctx.moveTo(a + space / 2, j + space / 2);
			ctx.lineTo((a + space / 2) + ((space / 2) * field[0] / field[2]), (j + space / 2) + ((space / 2) * field[1] / field[2]));
			ctx.stroke();
			ctx.beginPath();
			ctx.ellipse((a + space / 2) + ((space / 2) * field[0] / field[2]), (j + space / 2) + ((space / 2) * field[1] / field[2]), 2 * space / 20, 2 * space / 20, 0, 0, 2 * Math.PI);
			ctx.fill();
		}
	}
	for (i = 0; i < numCharges; i++) {
		if (charge_val[i] < 0) ctx.fillStyle = "#0000ff";
		else ctx.fillStyle = "#ff0000";
		ctx.beginPath();
		var val = Math.round(Math.abs(charge_val[i])) + 5;
		var ell_x = 500 + charge_x[i] * 50;
		var ell_y = 350 - charge_y[i] * 35;
		ctx.ellipse(ell_x, ell_y, val / 2, val / 2, 0, 0, 2 * Math.PI);
		ctx.fill();
	}
}

function get_field(x, y) {
	var sum_fx = 0;
	var sum_fy = 0;
	for (i = 0; i < numCharges; i++) {
		var r = Math.sqrt(Math.pow(charge_x[i] - x, 2) + Math.pow(charge_y[i] - y, 2));
		var f = charge_val[i] / (r * r);
		var fx = -f * (charge_x[i] - x) / r;
		var fy = f * (charge_y[i] - y) / r;
		sum_fx += fx;
		sum_fy += fy;
	}
	var force_arr = new Array();
	force_arr[0] = sum_fx;
	force_arr[1] = sum_fy;
	force_arr[2] = Math.sqrt(sum_fx * sum_fx + sum_fy * sum_fy);
	force_arr[2] = Math.round(force_arr[2] * 1000) / 1000;
	return force_arr;
}

function get_direction(field) {
	var theta = Math.atan(field[1] / field[0]);
	theta *= 180 / Math.PI;
	var horiz = "";
	var vert = "";
	if (field[0] > 0) horiz = "E";
	if (field[0] < 0) horiz = "W";
	if (field[1] > 0) vert = "N";
	if (field[1] < 0) vert = "S";
	var angle = "";
	theta = Math.round(theta * 10) / 10;
	theta = Math.abs(theta);
	if (theta % 90 != 0) angle = theta + "";
	return "[" + horiz + angle + vert + "]";
}