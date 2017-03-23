(function(KJHTML_APP) {

    var Reporter = function(options) {
        this.initialize(options);
    };

    Reporter.prototype = {

        initialize: function(options) {
            this.container = options.container || document.body,
            this.domUtil = options.domUtil;
            this.toolbar = options.toolbar;
            this.dotsSpectReporter = options.dotsSpectReporter;
            this.treeSpecReporter = options.treeSpecReporter;

            this._buildReporter();
        },

        scrollToSpec: function() {},

        jasmineStarted: function(suiteInfo) {
            var totalSpecsDefined = suiteInfo.totalSpecsDefined;
            this.toolbar.setTotalSpecsDefined(totalSpecsDefined);
        },

        suiteStarted: function(result) {

        },

        specStarted: function(result) {

        },

        specDone: function(result) {

        },

        suiteDone: function(result) {

        },

        jasmineDone: function() {

        },

        getJasmineHTMLReporter: function() {
            return {
                jasmineStarted: this.jasmineStarted.bind(this),
                suiteStarted: this.suiteStarted.bind(this),
                specStarted: this.specStarted.bind(this),
                specDone: this.specDone.bind(this),
                suiteDone: this.suiteDone.bind(this),
                jasmineDone: this.jasmineDone.bind(this)
            }
        },

        _buildReporter: function() {
            var toolbarEl = this.toolbar.getEl(),
                dotsSpectReporter = this.dotsSpectReporter.getEl(),
                treeSpecReporter = this.treeSpecReporter.getEl();

            var htmlReporterEl = this.domUtil.createDom({
                el: "div",
                attributes: {className: "kjhtml-reporter"},
                children: [toolbarEl, dotsSpectReporter, treeSpecReporter]
            });

            this.container.appendChild(htmlReporterEl);
        }
    }

    Reporter.prototype.constructor = Reporter;

    KJHTML_APP.registerClass("Reporter", Reporter);
})(KJHTML_APP);
