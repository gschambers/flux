(function() {
    "use strict";

    var Store = function() {
        this.data = {};
    };

    Object.assign(Store.prototype, require("./Emitter"), {
        has: function(key) {
            return this.data.hasOwnProperty(key);
        },

        get: function(key) {
            return this.data[key];
        },

        set: function(key, value) {
            var changeset = {};
            var data = key;
            
            if (value !== undefined) {
                data = {};
                data[key] = value;
            }

            Object.keys(data).forEach(function(key) {
                var oldValue = this.get(key);
                var value = data[key];

                changeset[key] = oldValue;
                this.data[key] = value;

                this.emit("change:" + key, value, oldValue);
            }, this);

            this.emit("change", changeset);
        },

        unset: function(key) {
            if (this.has(key)) {
                var oldValue = this.get(key);
                delete this.data[key];

                this.emit("change:" + key, undefined, oldValue);
            }
        },

        clear: function() {
            var changeset = {};

            Object.keys(this.data).forEach(function(key) {
                changeset[key] = this.get(key);
                this.unset(key);
            }, this);

            this.emit("change", changeset);
        }
    });

    module.exports = Store;
}).call(this);

