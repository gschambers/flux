(function() {
    "use strict";

    var flux = require("flux");
    var AppState = require("../stores/AppState");

    module.exports = new flux.Proxy(AppState);
}).call(this);
