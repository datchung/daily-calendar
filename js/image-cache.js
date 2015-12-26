var imageCache = (function (my) {
    var getKey = function(date) {
        return date.toISOString().substring(0, 10);
    };

    my.set = function(date, image) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        localStorage.setItem(getKey(date), image);
    };

    my.get = function(date) {
        return localStorage.getItem(getKey(date));
    };

    return my;
}(imageCache || {}));