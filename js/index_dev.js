// require('./index.js');

// Mock setup
var $ = require('jquery');
$.mockjax = require('../vendor_dev/jquery-mockjax/jquery.mockjax.js');

console.log($.extend);

$(document).ready(function() {
    console.log('ready');
    $.mockjax({
        url: "/test",
        responseText: {
            status: "success",
            fortune: "Are you a mock turtle?"
        }
    });
});
