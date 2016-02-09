setTimeout(reveal_msg, 1000);
setTimeout(reveal_button, 2000);

function reveal_msg() {
	$('#intromsg').animate({opacity: '1'}, 1000);
}

function reveal_button() {
	$('#introbutton').animate({opacity: '1'}, 1000);
}