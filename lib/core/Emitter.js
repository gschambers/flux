(function() {
    "use strict";

    var Emitter = {
        allListeners: function() {
            return (this.listeners || this.listeners = []);
        },

        clearListeners: function() {
            while (this.listeners.length) {
                this.listeners.pop();
            }
        },

        getListeners: function(type) {
            return this.allListeners().filter(function(defn) {
                return defn.type = type;
            });
        },

        emit: function(type /*, ...args */) {
            var args = Array.from(arguments).slice(1);

            this.getListeners(type).forEach(function(defn) {
                defn.callback.apply(defn.context || defn.callback, args);
            });
        },

        on: function(type, callback, context) {
            this.allListeners().push({
                type: type,
                callback: callback,
                context: context
            });
        },

        once: function(type, callback, context) {
            var self = this;

            var wrap = function wrap() {
                callback.apply(this, arguments);
                self.off(type, wrap);
            };

            this.on(type, wrap, context);
        },

        off: function(type, callback) {
            var listeners = this.allListeners();
            var i = listeners.length;

            if (!type) {
                this.clearListeners();
                return;
            }

            while (i--) {
                var defn = listeners[i];

                if (defn.type !== type) {
                    continue;
                }

                if (!callback || defn.callback === callback) {
                    listeners.splice(i, 1);
                }
            }
        }
    };

    module.exports = Emitter;
}).call(this);
