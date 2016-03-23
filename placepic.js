window.onload = function() {	
	$('#pic-clone').width(document.getElementById("top-pic").width);
	$('#pic-clone').height(document.getElementById("top-pic").height);
	$('#pic-clone').position(document.getElementById("top-pic").top, document.getElementById("top-pic").left);
}