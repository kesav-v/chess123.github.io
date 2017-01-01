var request = new XMLHttpRequest();
request.open("GET", "http://www.uschess.org/msa/MbrDtlTnmtHst.php?13159334", false);
request.send(null);
var doc = document.implementation.createHTMLDocument("example");
doc.documentElement.innerHTML = request.responseText;
console.log(doc);