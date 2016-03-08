window.onload = get_current_time;

function get_current_time() {
	var d = new Date();
	var s = d.getSeconds();
	var min = d.getMinutes();
	var h = d.getHours();
	var day = d.getDate();
	var m = d.getMonth() + 1;
	var y = d.getFullYear();
	document.getElementById("displaytime").innerHTML = [y,day,h,min,s];
	return [s,min,h,day,y];
}

function get_time_difference(time) {
	var grad = new Date(2017,5,1,10,0,0,0);
	var sec = grad.getSeconds()
}