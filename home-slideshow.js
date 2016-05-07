document.body.onload = function() {
  document.getElementsByClassName("slidesjs-previous")[0].innerHTML = "<b><</b>";
  document.getElementsByClassName("slidesjs-next")[0].innerHTML = "<b>></b>";
  // var nums = document.getElementsByClassName("slidesjs-pagination-item");
  // for (i = 0; i < nums.length; i++) {
  //   nums[i].innerHTML = "&#9633;";
  // }
  $('.slidesjs-pagination-item').children().html("&#9675;");
  $('.slidesjs-pagination-item:nth-child(1)').children().html("&#9679;");
};

$(function() {
  $('#slides').slidesjs({
    effect: {
      slide: {
        speed: 1000
      }
    },
    callback: {
      complete: function(number) {
        $('.slidesjs-pagination-item').children().html("&#9675;");
        $('.slidesjs-pagination-item:nth-child(' + (number) + ')').children().html("&#9679;");
      }
    }
  });
});