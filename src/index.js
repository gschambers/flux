(function() {
    "use strict";

    var AppDispatcher = require("./dispatchers/App");

    AppDispatcher.dispatch("loadMiddleware", [
        "logger",
        "profiler"
    ]).then(function(middleware) {
        return AppDispatcher.dispatch("initialize", {
            middleware: middleware
        });
    }).then(function() {
        console.info("Application initialized");
    }).catch(function(error) {
        console.error("Error initializing application:", error);
    });
}).call(this);
