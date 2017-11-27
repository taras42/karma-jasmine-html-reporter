(function(KJHTML_APP) {

    var TreeSpecReporter = function(options) {
        this.initialize(options);
    };

    TreeSpecReporter.prototype = {

        initialize: function(options) {
            this.domUtil = options.domUtil;
            this.specUtil = options.specUtil;

            this._createElements();

            this.currentSuite = null;
            this.currentSpec = null;
        },

        startSuite: function(suite) {
            var suiteEl,
                suiteDescr;

            if (!this.currentSuite) {
                suiteDescr = this.domUtil.createDom({
                    el: "p",
                    attributes: {className: "kjhtml-tree-spec-reporter-suite-descr"},
                    children: [suite.description]
                });

                suiteEl = this.domUtil.createDom({
                    el: "div",
                    attributes: {
                        id: this.specUtil.getSuiteId(),
                        className: "kjhtml-tree-spec-reporter-suite"
                    },
                    children: [suiteDescr]
                });

                this.suiteContainer.appendChild(suiteEl);
            }
        },

        startSpec: function(spec) {},

        stopSpec: function(spec) {
            var specStatusClass,
                specStatus = spec.status,
                specEl,
                specNameEl,
                specElChildren,
                specFailsContainer;

            specNameEl = this.domUtil.createDom({
                el: "p",
                attributes: {
                    className: "kjhtml-tree-spec-reporter-spec-name"
                },
                children: [spec.fullName]
            });

            specStatusClass = this._getSpecClassBySpecStatus(specStatus);

            if (this.specUtil.isSpecFailed(specStatus)) {
                specElChildren = this._getFailedSpecExpectationsEl(spec);
            } else {
                specElChildren = [specNameEl];
            }

            specEl = this.domUtil.createDom({
                el: "div",
                attributes: {
                    id: this.specUtil.getSpecId(),
                    className: specStatusClass
                },
                children: specElChildren
            });

            this.currentSuite.appendChild(specEl);
        },

        stopSuite: function(suite) {
            if (this.currentSuite.parent === this.suiteContainer) {
                this.currentSuite = null;
            } else {
                this.currentSuite = this.currentSuite.parent;
            }
        },

        render: function() {
            this.el.appendChild(this.suiteContainer);
        },

        getEl: function() {
            return this.el;
        },

        // private methods

        _createElements: function() {
            this.suiteContainer = this.domUtil.createDom({
                el: "div",
                attributes: {className: "kjhtml-tree-spec-reporter-suite-container"}
            });

            this.el = this.domUtil.createDom({
                el: "div",
                attributes: {className: "kjhtml-tree-spec-reporter"}
            });
        },

        _getSpecClassBySpecStatus: function(specStatus) {
            var specStatusClass = "kjhtml-tree-spec-reporter-spec";

            if (this.specUtil.isSpecHasNoExpectations(specStatus)) {
                specStatusClass = specStatusClass + " has-no-expectations";
            } else {
                specStatusClass = specStatusClass + " " + specStatus;
            }

            return specStatusClass;
        },

        _getFailedSpecExpectationsEl: function(spec) {
            var self = this;

            var failedSpecDetailsElChildren = spec.failedExpectations.reduce(function(memo, expectation) {
                var expectationMessageEl = self.domUtil.createDom({
                    el: "div",
                    attributes: {className: "kjhtml-tree-spec-reporter-spec-failed-expectation-message"},
                    children: [expectation.message]
                });

                var expectationStackEl = self.domUtil.createDom({
                    el: "div",
                    attributes: {className: "kjhtml-tree-spec-reporter-spec-failed-expectation-stack"},
                    children: [expectation.stack]
                });

                memo.push(self.domUtil.createDom({
                    el: "div",
                    attributes: {className: "kjhtml-tree-spec-reporter-spec-failed-expectation"},
                    children: [expectationMessageEl, expectationStackEl]
                }));

                return memo;
            }, []);

            var failedSpecExpectationsEl = this.domUtil.createDom({
                el: "div",
                attributes: {className: "kjhtml-tree-spec-reporter-spec-failed-expectations"},
                children: failedSpecDetailsElChildren
            });

            return [failedSpecExpectationsEl];
        }
    }

    TreeSpecReporter.prototype.constructor = TreeSpecReporter;

    KJHTML_APP.register("TreeSpecReporter", TreeSpecReporter);
})(KJHTML_APP);
