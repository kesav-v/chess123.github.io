window.onload = function() {
  document.getElementsByClassName("slidesjs-previous")[0].innerHTML = "<b><</b>";
  document.getElementsByClassName("slidesjs-next")[0].innerHTML = "<b>></b>";
  document.getElementsByClassName("slidesjs-stop")[0].innerHTML = "&#10074;&#10074;";
  document.getElementsByClassName("slidesjs-play")[0].innerHTML = "&#9654;";
  $('.slidesjs-pagination-item').children().html("&#9675;");
  $('.slidesjs-pagination-item:nth-child(1)').children().html("&#9679;");
};

$(function() {
  $('#slides').slidesjs({
    effect: {
      slide: {
        speed: 1000
      },
      fade: {
        speed: 1000
      }
    },
    callback: {
      complete: function(number) {
        $('.slidesjs-pagination-item').children().html("&#9675;");
        $('.slidesjs-pagination-item:nth-child(' + (number) + ')').children().html("&#9679;");
      }
    },
    play: {
      active: true,
      auto: true,
      interval: 8000,
      swap: true,
      effect: "fade"
   }
  });
});