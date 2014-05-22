(function() {
    "use strict";

    var flux = require("flux");
    var AppData = require("../stores/AppData");

    module.exports = new flux.Proxy(AppData);
}).call(this);
