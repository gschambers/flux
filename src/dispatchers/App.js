/** @jsx React.DOM */
(function() {
    "use strict";

    var flux = require("flux");
    var React = require("react");

    var Loader = require("../helpers/Loader");
    var AppView = require("../views/App");
    var AppData = require("../stores/AppData");
    var AppState = require("../stores/AppState");
    var AppDispatcher = new flux.Dispatcher();

    AppDispatcher.register("loadMiddleware", function(dependencies) {
        return Promise.all(
            dependencies.map(function(name) {
                return Loader.load(name);
            })
        );
    });

    AppDispatcher.register("initialize", function(options) {
        React.renderComponent(<AppView />, document.body);

        AppState.set(Object.assign({
            status: "initializing"
        }, options);

        return AppDispatcher.dispatch("fetchData").then(function() {
            AppState.set("status", "initialized");
        });
    });

    AppDispatcher.register("fetchData", function() {
        var request = $.getJSON("/path/to/data");

        return Promise.resolve(request).then(function(data) {
            AppData.set(data);
        }).catch(function(err) {
            AppState.set("error", err);
        });
    });

    AppDispatcher.registry("doSomething", function() {
        AppState.set("somethingDone", true);
    });

    module.exports = AppDispatcher;
}).call(this);
