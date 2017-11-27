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
            var domUtil = this.get("domUtil"),
                specUtil = this.get("specUtil");

            var TreeSpecReporter = this.get("TreeSpecReporter"),
                treeSpecReporter = new TreeSpecReporter({
                    domUtil: domUtil,
                    specUtil: specUtil
                });

            var DotsSpecReporter = this.get("DotsSpecReporter"),
                dotsSpecReporter = new DotsSpecReporter({
                    domUtil: domUtil,
                    specUtil: specUtil
                });

            var Reporter = this.get("Reporter"),
                reporter = new Reporter({
                    domUtil: domUtil,
                    dotsSpecReporter: dotsSpecReporter,
                    treeSpecReporter: treeSpecReporter
                });
        },

        unregister: function(name) {
            delete this.context[name];
        }
    }

    App.prototype.constructor = App;

    return new App;

})({});
