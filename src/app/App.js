var KJHTML_APP = (function(options) {

    var App = function(options) {
        this.initialize(options);
    };

    App.prototype = {

        initialize: function(options) {
            this.classes = {};
        },

        registerClass: function(className, classFunction) {
            this.classes[className] = classFunction;
        },

        getClass: function(className) {
            if (this.classes[className]) {
                return this.classes[className];
            } else {
                throw new Error("There is no class with name " + className);
            }
        },

        start: function() {
            var DomUtil = this.getClass("DomUtil"),
                domUtil = new DomUtil();

            var Reporter = this.getClass("Reporter"),
                reporter = new Reporter({
                    domUtil: domUtil
                });
        },

        removeClass: function(className) {
            delete this.classes[className];
        }
    }

    App.prototype.constructor = App;

    return new App;

})({});
