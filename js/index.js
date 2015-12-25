$(document).ready(function() {
    console.log('ready');

    var getDateString = function(date) {
    	return date.toISOString().substring(0, 10);
    };
    var setPreviousDay = function(date) {
    	return date.setDate(displayedDate.getDate() - 1);
    };
    var setNextDay = function(date) {
    	var today = new Date();
    	today.setHours(0, 0, 0, 0);

    	// Only set to next day if less than or equal to current day
    	if(date < today) {
    		return date.setDate(displayedDate.getDate() + 1);
    	}
    	else {
    		return date;
    	}
    };

    var updateImage = function(date) {
    	var dateString = getDateString(date);

    	$.ajax({
	    	url: 'http://datchung.com/daily-calendar/get.php?d=' + dateString
	    })
	    .done(function(response) {
	    	var label = document.getElementById('date');
	    	label.innerHTML = dateString;

	    	var img = document.getElementById('main-img');
			img.src = 'data:image/jpeg;base64,' + response;
	    });
    };

    // Show initial image on load
    var displayedDate = new Date();
    displayedDate.setHours(0, 0, 0, 0);
    updateImage(displayedDate);

    var left = function() {
    	setNextDay(displayedDate);
    	updateImage(displayedDate);
    };
    var right = function() {
    	setPreviousDay(displayedDate);
    	updateImage(displayedDate);
    };
    swipe.listen(left, right);
});