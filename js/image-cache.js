var imageCache = (function (my) {
    var getKey = function(date) {
        return date.toISOString().substring(0, 10);
    };

    my.set = function(date, image) {
        try {
            localStorage.setItem(getKey(date), image);
        }
        catch(e) {
            console.log('Cache is full. ', e);
        }
    };

    my.get = function(date) {
        return localStorage.getItem(getKey(date));
    };

    return my;
}(imageCache || {}));