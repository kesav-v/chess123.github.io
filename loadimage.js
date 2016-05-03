var urls = ["./images/KesavGrade3.JPG", "./images/KesavBayArea2012.jpg",
"./images/KesavAnand.jpg", "./images/KesavDubai.jpg", "./images/KesavMVChess.jpg",
"./images/KesavAtWashingtonInt.jpg", "./images/KesavStukopin.jpg", "./images/KesavKovalyov.jpg",
"./images/KesavRuifeng.jpg", "./images/KesavGoldMedal.jpg", "./images/KesavSimul.jpg", "./images/KesavAtlanta.jpg"];
var images = new Array();
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
var num = 0;
var timer;
var timer2;
var times = 0;
window.onload = slideshow();
function change_pic() {
    $("#caption").fadeTo(1000, 0);
    $("#image1").fadeTo(1000, 0, function() {
        num++;
        num %= urls.length;
        document.getElementById("image1").src = urls[num];
        document.getElementById("caption").innerHTML = captions[num];
        times++;
        $("#image1").fadeTo(1000, 1);
        $("#caption").fadeTo(1000, 1);

    });
}
function slideshow() {
    timer = setInterval(change_pic, 6000);
}