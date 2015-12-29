/**
 * Wrapper for two stage caching.
 *
 * Stage 1 (localStorage):
 * Images will be cached and persisted even after ending the session for up to CACHE_PERSIST_DAYS
 * from the current date.
 *
 * Stage 2 (sessionStorage):
 * Images will be cached (but not persisted) regardless of age.
 *
 * Example use case:
 * # User browses images for previous days up to CACHE_PERSIST_DAYS ago.
 * ** These images are cached and persisted (stage 1).
 * # User browses images further than CACHE_PERSIST_DAYS ago.
 * ** These images are cached but not persisted (stage 2).
 * # User browses back to an image.
 * ** Image loads from stage 2 cache.
 * # User browses back to an image within CACHE_PERSIST_DAYS ago.
 * ** Image loads from stage 1 cache.
 */
var imageCache = (function (my) {
    var CACHE_PERSIST_DAYS = 7;

    var getKey = function(date) {
        return date.toISOString().substring(0, 10);
    };

    var daysBetween = function(first, second) {
        first.setHours(0, 0, 0, 0);
        second.setHours(0, 0, 0, 0);
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    };

    var trySet = function(storage, date, image) {
        try {
            storage.setItem(getKey(date), image);
        }
        catch(e) {
            console.log('Cache is full. ', e);
        }
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

        if(daysBetween(date, today) < CACHE_PERSIST_DAYS) {
            // Cache and persist
            trySet(localStorage, date, image);
        }
        else {
            // Cache only
            trySet(sessionStorage, date, image);
        }

        // Routine cache cleanup
        free();
    };

    my.get = function(date) {
        var key = getKey(date);
        return localStorage.getItem(key) || sessionStorage.getItem(key);
    };

    return my;
}(imageCache || {}));

module.exports = imageCache;