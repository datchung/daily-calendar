var imageCache = (function (my) {
    var CACHE_PERSIST_DAYS = 10;

    var getKey = function(date) {
        return date.toISOString().substring(0, 10);
    };

    var daysBetween = function(first, second) {
        first.setHours(0, 0, 0, 0);
        second.setHours(0, 0, 0, 0);
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    };

    /**
     * Free up cache by removing older items.
     */
    var free = function() {
        var today = new Date();

        var dateString;
        var date;
        for (var i = 0, length = localStorage.length; i < length; ++i) {
            dateString = localStorage.key(i);
            date = new Date(dateString);
            if(daysBetween(date, today) > CACHE_PERSIST_DAYS) {
                localStorage.removeItem(dateString);
            }
        }
   };

    my.set = function(date, image) {
        var today = new Date();

        if(daysBetween(date, today) <= CACHE_PERSIST_DAYS) {
            try {
                localStorage.setItem(getKey(date), image);
            }
            catch(e) {
                console.log('Cache is full. ', e);
            }
        }

        free();
    };

    my.get = function(date) {
        return localStorage.getItem(getKey(date));
    };

    return my;
}(imageCache || {}));