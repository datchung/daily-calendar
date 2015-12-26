$(document).ready(function() {
    var STATUS_LOADING = 'Loading...';
    var STATUS_ERROR = 'Error loading image. Please check your internet connection or try again later.';

    var getDateString = function(date) {
    	return date.toISOString().substring(0, 10).replace(/-/g, '.');
    };
    var setPreviousDay = function(date) {
    	return date.setDate(displayedDate.getDate() - 1);
    };
    var setNextDay = function(date) {
		return date.setDate(displayedDate.getDate() + 1);
    };

    var displayDate = function(dateString) {
        var label = document.getElementById('date');
        label.innerHTML = dateString;
    };
    var displayStatus = function(statusString) {
        var img = document.getElementById('main-img');
        var status = document.getElementById('status');
        img.style.display = 'none';
        status.style.display = 'inline-block';
        status.innerHTML = statusString;
    };
    var displayImage = function(src) {
        var img = document.getElementById('main-img');
        var status = document.getElementById('status');
        img.src = 'data:image/jpeg;base64,' + src;
        status.style.display = 'none';
        img.style.display = 'inline-block';
    };

    var updateDisplay = function(date) {
    	var dateString = getDateString(date);

        displayDate(dateString);
        displayStatus(STATUS_LOADING);

        var src = imageCache.get(date);
        if(src) {
            // Display mage from cache
            displayImage(src);
        }
        else {
            // Display image from API
            $.ajax({
                url: 'http://datchung.com/daily-calendar/get.php?d=' + dateString
            })
            .done(function(response) {
                displayImage(response);
                imageCache.set(date, response);
            })
            .fail(function() {
                displayStatus(STATUS_ERROR);
            });
        }
    };

    // Show initial image on load
    var displayedDate = new Date();
    displayedDate.setHours(0, 0, 0, 0);
    updateDisplay(displayedDate);

    var leftSwipe = function() {
    	var today = new Date();
    	today.setHours(0, 0, 0, 0);

    	// Don't allow showing a picture for a future date
    	if(displayedDate < today) {
	    	setNextDay(displayedDate);
	    	updateDisplay(displayedDate);
	    }
    };
    var rightSwipe = function() {
    	setPreviousDay(displayedDate);
    	updateDisplay(displayedDate);
    };
    swipe.listen(leftSwipe, rightSwipe);
});