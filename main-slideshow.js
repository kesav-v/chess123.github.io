var captions = ["Kesav behind the chess board (May 2008)", "Kesav at the Bay Area International (January 2012)",
"Kesav with former world champion Viswanathan Anand (August 2012)", "Kesav before a game in Dubai, UAE (December 2013)",
"Kesav at Monta Vista chess club (January 2014)",
"Kesav playing at the Washington International in Rockville, MD (August 2014)",
"Kesav playing a game against GM Stukopin at University of Texas at Brownsville (March 2015)",
"Kesav playing a game against GM Kovalyov at University of Texas at Brownsville (March 2015)",
"Kesav playing a game against IM Li at University of Texas at Brownsville (May 2015)",
"Kesav receiving the gold medal in Kitchener, ON, Canada (July 2015)",
"Kesav playing a simul at Let's Play Chess Club (October 2015)",
"Kesav at the 2016 High School Nationals in Atlanta, GA"];

$(function() {
  $('#slides').slidesjs({
    width: 1280,
    height: 854,
    play: {
      active: false,
      auto: true,
      effect: "fade",
      interval: 5000,
      swap: true,
      restartDelay: 2500,
    },
    effect: {
      fade: {
        speed: 1000
      }
    },
    callback: {
      start: function(number) {
        document.getElementById("caption").innerHTML = captions[number % captions.length];
      }
    },
    navigation: false,
    pagination: false
  });
});