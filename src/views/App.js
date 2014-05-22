/** @jsx React.DOM */
(function() {
    "use strict";

    var React = require("react");
    var AppState = require("../proxies/AppState");
    var AppData = require("../proxies/AppData");

    var AppView = React.createClass({
        componentDidMount: function() {
            this.bindEvents();
        },

        componentWillUnmount: function() {
            this.unbindEvents();
        },

        bindEvents: function() {
            AppState.on("change", this.onChange, this);
            AppData.on("change", this.onChange, this);
        },

        unbindEvents: function() {
            AppState.off("change", this.onChange);
            AppData.off("change", this.onChange);
        },

        onChange: function(changeset) {
            this.setState(changeset);
        },

        onClick: function(evt) {
            evt.preventDefault();
            AppDispatcher.dispatch("doSomething"); 
        },

        getInitialState: function() {
            return {
                somethingDone: false
            };
        },

        render: function() {
            if (this.state.somethingDone) {
                return <div>Done</div>;
            }

            return (
                <div>
                    <a href="#" onClick={this.onClick}>Do Something</a>
                </div>
            );
        }
    });

    module.exports = AppView;
}).call(this);
