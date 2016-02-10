var thecover;
var the_bottom;
window.onload = function() {
	thecover = document.getElementById("facet-cover");
	thecover.style.height = document.getElementById("facet-container").offsetHeight;
	thecover.style.width = document.getElementById("facet-container").offsetWidth;
	thecover.style.bottom = document.getElementById("facet-container").offsetBottom;
	thecover.style.left = document.getElementById("facet-container").offsetLeft;
	the_bottom = thecover.offsetBottom;
	setTimeout(reveal_msg, 1000);
	setTimeout(reveal_button, 2000);
	setTimeout(reveal_facets, 3000);
};

function reveal_msg() {
	$('#intromsg').animate({opacity: '1'}, 1000);
}

function reveal_button() {
	$('#introbutton').animate({opacity: '1'}, 1000);
}

function reveal_facets() {
	document.getElementById("facet-container").style.visibility = "visible";
	$('#facet-cover').animate({top: the_bottom + 'px'}, 1000);
	console.log(thecover.offsetBottom);
}