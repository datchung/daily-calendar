$(document).ready(function() {
    console.log('ready');

    var getDateString = function(date) {
    	return date.toISOString().substring(0, 10);
    };
    var setPreviousDay = function(date) {
    	return date.setDate(displayedDate.getDate() - 1);
    };
    var setNextDay = function(date) {
    	return date.setDate(displayedDate.getDate() + 1);
    };

    var updateImage = function(date) {
    	$.ajax({
	    	url: 'http://datchung.com/daily-calendar/get.php?d=' + getDateString(date)
	    })
	    .done(function(response) {
	    	var img = document.getElementById('main-img');
			img.src = 'data:image/jpeg;base64,' + response;
	    });
    };

    // Show initial image on load
    var displayedDate = new Date('2015-08-26');
    updateImage(displayedDate);

    var left = function() {
    	setPreviousDay(displayedDate);
    	updateImage(displayedDate);
    };
    var right = function() {
    	setNextDay(displayedDate);
    	updateImage(displayedDate);
    };
    swipe.listen(left, right);
});