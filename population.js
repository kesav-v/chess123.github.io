var resources;
var people;
var num_years;

window.onload = function() {
	init(100, 20000);
	setInterval(run, 5);
}
	

function init(numPeople, numResources) {
	people = new Array();
	for (i = 0; i < numPeople; i++) {
		people[i] = [(((i + 1) * 75.0 / numPeople) | 0), (100 * Math.sqrt(Math.random())) | 0, (Math.random() * 11) | 0 + 20];
	}
	resources = numResources;
	num_years = 0;
}

function run() {
	if (people.length >= 200000 || people.length <= 0) return;
	document.getElementById("growthrate").innerHTML = move() + "%";
	// if (i % (10000 / 1000) == 0) {
		// pw.println((i + 1) + "\t" + people.length);
		document.getElementById("popnum").innerHTML = String(people.length) + "\t" + String(resources);
	// }
}

function move() {
	num_years++;
	// if (people.length > resources) {
	// 	console.log("Too many people");
	// 	people.splice(resources, people.length - resources);
	// 	return Math.round(10000 * (Math.pow(people.length / 100, 1 / num_years) - 1)) / 100;
	// }
	for (i = people.length - 1; i >= 0; i--) {
		people[i][0]++;
		if (people[i][0] >= people[i][1]) {
			people.splice(i, 1);
		}
		else if (people[i][0] == people[i][2] && i % 2 == 0) {
			people.push([0, (100 / (1 + Math.pow(Math.E, 1.3 - 0.5 * resources / people.length))) | 0, (Math.random() * 11) | 0 + 20]);
			people.push([0, (100 / (1 + Math.pow(Math.E, 1.3 - 0.5 * resources / people.length))) | 0, (Math.random() * 11) | 0 + 20]);
			if (Math.random() < 0.2) people.push([0, (100 / (1 + Math.pow(Math.E, 1.3 - 0.5 * resources / people.length))) | 0, (Math.random() * 11) | 0 + 20]);
		}
	}
	return Math.round(10000 * (Math.pow(people.length / 100, 1 / num_years) - 1)) / 100;
}