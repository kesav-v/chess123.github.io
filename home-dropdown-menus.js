/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction(n) {
  for (i = 0; i < 5; i++) {
    if (i == n - 1) continue;
    document.getElementById("myDropdown" + (i + 1)).classList.remove("show");
  }
  document.getElementById("myDropdown" + n).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn') && !event.target.matches('.drpdntext')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};