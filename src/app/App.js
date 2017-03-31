var KJHTML_APP = (function(options) {

    var App = function(options) {
        this.initialize(options);
    };

    App.prototype = {

        initialize: function(options) {
            this.context = {};
        },

        register: function(name, obj) {
            this.context[name] = obj;
        },

        get: function(name) {
            if (this.context[name]) {
                return this.context[name];
            } else {
                throw new Error("There is no module with name " + name);
            }
        },

        start: function() {
            var domUtil = this.get("domUtil");

            var Reporter = this.get("Reporter"),
                reporter = new Reporter({
                    domUtil: domUtil
                });
        },

        unregister: function(name) {
            delete this.context[name];
        }
    }

    App.prototype.constructor = App;

    return new App;

})({});
