$(document).ready(function() {
    var STATUS_LOADING = 'Loading...';
    var STATUS_ERROR = 'Error, could not load image. Please check your internet connection or try again later.';

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
    	var dateString = getDateString(date);

    	var img = document.getElementById('main-img');
    	var status = document.getElementById('status');
    	img.style.display = 'none';
    	status.style.display = 'inline';
    	status.innerHTML = STATUS_LOADING;

    	$.ajax({
	    	url: 'http://datchung.com/daily-calendar/get.php?d=' + dateString
	    })
	    .done(function(response) {
	    	var label = document.getElementById('date');
	    	label.innerHTML = dateString;

			img.src = 'data:image/jpeg;base64,' + response;

			status.style.display = 'none';
			img.style.display = 'inline';
	    })
	    .fail(function() {
	    	status.innerHTML = STATUS_ERROR;
	    });
    };

    // Show initial image on load
    var displayedDate = new Date();
    displayedDate.setHours(0, 0, 0, 0);
    updateImage(displayedDate);

    var left = function() {
    	var today = new Date();
    	today.setHours(0, 0, 0, 0);

    	// Don't allow showing a picture for a future date
    	if(displayedDate < today) {
	    	setNextDay(displayedDate);
	    	updateImage(displayedDate);
	    }
    };
    var right = function() {
    	setPreviousDay(displayedDate);
    	updateImage(displayedDate);
    };
    swipe.listen(left, right);
});