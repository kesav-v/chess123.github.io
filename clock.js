var c, ctx;

window.onload = function() {
	c = document.getElementById("mycanvas");
	ctx = c.getContext('2d');
	update_time();
	var timer = setInterval(update_time, 50);
}

function update_time() {
	ctx.clearRect(0, 0, c.width, c.height);
	var d = new Date();
	var h = d.getHours() % 12;
	var m = d.getMinutes();
	var s = d.getMilliseconds() / 1000 + d.getSeconds();
	var angle1 = 2 * Math.PI * (h + (m + s / 60) / 60) / 12;
	var angle2 = 2 * Math.PI * (m + s / 60) / 60;
	var angle3 = 2 * Math.PI * s / 60;
	ctx.strokeStyle = "#ffffff";
	for (i = 0; i < 2 * Math.PI; i += Math.PI / 6) {
		ctx.beginPath();
		ctx.moveTo(500, 350);
		ctx.lineTo(500 + 300 * Math.cos(i), 350 + 300 * Math.sin(i));
		ctx.stroke();
	}
	var n = 0;
	for (i = 0; i < 2 * Math.PI; i += Math.PI / 30) {
		n++;
		if (n % 5 == 1) continue;
		ctx.beginPath();
		ctx.moveTo(500, 350);
		ctx.lineTo(500 + 270 * Math.cos(i), 350 + 270 * Math.sin(i));
		ctx.stroke();
	}
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.ellipse(500, 350, 250, 250, 0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.fillStyle = "#ff0000";
	ctx.beginPath();
	ctx.arc(500, 350, 250, 3 * Math.PI / 2, 3 * Math.PI / 2 + angle3);
	ctx.lineTo(500, 350);
	ctx.fill();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.ellipse(500, 350, 200, 200, 0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.fillStyle = "#00ff00";
	ctx.beginPath();
	ctx.arc(500, 350, 200, 3 * Math.PI / 2, 3 * Math.PI / 2 + angle2);
	ctx.lineTo(500, 350);
	ctx.fill();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.ellipse(500, 350, 150, 150, 0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.fillStyle = "#0000ff";
	ctx.beginPath();
	ctx.arc(500, 350, 150, 3 * Math.PI / 2, 3 * Math.PI / 2 + angle1);
	ctx.lineTo(500, 350);
	ctx.fill();
	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.ellipse(500, 350, 100, 100, 0, 0, 2 * Math.PI);
	ctx.fill();
	var str = "";
	if (h < 10) str += "0";
	str += h + ":";
	if (m < 10) str += "0";
	str += m;
	ctx.fillStyle = "#ffffff";
	ctx.font = "30px Arial";
	ctx.fillText(str, 460, 365);
}