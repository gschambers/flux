(function() {
    "use strict";

    var Dispatcher = function() {
        this.callbacks = [];
    };

    Dispatcher.prototype = {
        getCallbacks: function(action) {
            return this.callbacks.filter(function(defn) {
                return defn.action === action;
            }).map(function(defn) {
                return defn.callback;
            });
        },

        dispatch: function(action /*, ...args */) {
            var args = Array.from(arguments).slice(1);

            return Promise.all(
                this.getCallbacks(action).map(function(callback) {
                    return callback.apply(callback, args);
                });
            );
        },

        register: function(action, callback) {
            this.callbacks.push({
                action: action,
                callback: callback
            });
        }
    };

    module.exports = Dispatcher;
}).call(this);
