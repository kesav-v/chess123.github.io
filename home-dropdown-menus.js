var current_open = 0;
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction(n) {
  if (document.getElementById("myDropdown" + n).classList.contains("show")) {
    var theheight = document.getElementById("myDropdown" + n).offsetHeight;
    $('#myDropdown' + n).animate({height: "0px"}, 500, function() {
      document.getElementById("myDropdown" + n).classList.toggle("show");
      document.getElementById("myDropdown" + n).style.height = theheight + "px";
    });
    return;
  }
  for (i = 0; i < 6; i++) {
    if (i == n - 1) continue;
    document.getElementById("myDropdown" + (i + 1)).classList.remove("show");
  }
  current_open = n;
  document.getElementById("myDropdown" + n).classList.toggle("show");
  var theheight = document.getElementById("myDropdown" + n).offsetHeight;
  document.getElementById("myDropdown" + n).style.height = "0px";
  $('#myDropdown' + n).animate({height: theheight + "px"}, 500);
}

function numAs(elem) {
  var cnt = 0;
  for (i = 0; i < elem.length - 1; i++) {
    if (elem.substring(i, i + 2) === "<a") cnt++;
  }
  return cnt;
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn') && !event.target.matches('.drpdntext')) {
    if (current_open == 0) return;
    if (document.getElementById("myDropdown" + current_open).classList.contains("show")) myFunction(current_open);
  }
};