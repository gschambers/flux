(function() {
    "use strict";

    module.exports = function(store) {
        var Proxy = function() {
            this.listeners = store.allListeners();
        };

        Proxy.prototype = Object.assign({
            get: function(key) {
                return store.get(key);
            }
        }, require("./Emitter"));

        return new Proxy();
    };
}).call(this);
