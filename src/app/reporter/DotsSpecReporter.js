(function(KJHTML_APP) {

    var DotsSpecReporter = function(options) {
        this.initialize(options);
    };

    DotsSpecReporter.prototype = {

        initialize: function(options) {
            this.domUtil = options.domUtil;
            this.specUtil = options.specUtil;

            this._createElements();

            this.currentSpec = null;
        },

        startSpec: function(spec) {
            var specName = spec.fullName,
                specId = spec.id;

            var specEl = this.domUtil.createDom({
                el: "div",
                attributes: {
                    id: specId,
                    className: "kjhtml-dots-spec-reporter-spec"
                },
                children: [specName]
            });

            this.currentSpec = specEl;
        },

        stopSpec: function(spec) {
            var status = spec.status;

            if (this.specUtil.isSpecHasNoExpectations(spec)) {
                this.domUtil.addClass(this.currentSpec, 'has-no-expectations');
            } else {
                this.domUtil.addClass(this.currentSpec, status);
            }

            this.dotsContainer.appendChild(this.currentSpec);
            this.currentSpec = null;
        },

        getEl: function() {
            return this.el;
        },

        // private methods

        _createElements: function() {
            this.dotsContainer = this.domUtil.createDom({
                el: "div",
                attributes: {className: "kjhtml-dots-spec-reporter-dots"},
            });

            this.infoContainer = this.domUtil.createDom({
                el: "div",
                attributes: {className: "kjhtml-dots-spec-reporter-info"},
            });

            this.el = this.domUtil.createDom({
                el: "div",
                attributes: {className: "kjhtml-dots-spec-reporter"},
                children: [this.dotsContainer, this.infoContainer]
            });
        }
    }

    DotsSpecReporter.prototype.constructor = DotsSpecReporter;

    KJHTML_APP.register("DotsSpecReporter", DotsSpecReporter);
})(KJHTML_APP);
