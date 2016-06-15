function average (scores) {
	 // body...  
	var total = 0;
	scores.forEach( function(score) {
		// statements
		total += score;
	});
	var avg = total/scores.length

	return Math.round(avg);
}

var scores = [99, 90, 66, 77, 88]
console.log(average(scores));

var scores2 = [91, 20, 46, 27, 58]
console.log(average(scores2));