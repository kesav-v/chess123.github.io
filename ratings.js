

function calculate_rating(my_rating, opp_ratings, score) {
	var eff = 50;
	if (my_rating < 2355) {
		eff = 50 / Math.sqrt(0.662 + 0.00000739 * (2569 - my_rating) * (2569 - my_rating));
	}
	var k = 800 / (opp_ratings.length + eff);
	var e = 0;
	for (i = 0; i < opp_ratings; i++) {
		e += 1 / (1 + Math.pow(10, (opp_ratings[i] - my_rating) / 400));
	}
	var b = 0;
	if (k * (score - e) > 12 * Math.sqrt(opp_ratings.length)) b = k * (score - e) - 12 * Math.sqrt(opp_ratings.length);
	return my_rating + k * (s - e) + b;
}