(function() {

    var Reporter = function(options) {
        this.initialize(options);
    };

    Reporter.prototype = {
        initialize: function(options) {
            this.toolbar = options.toolbar;
            this.dotsSpectReporter = options.dotsSpectReporter;
            this.treeSpecReporter = options.treeSpecReporter;
        },

        scrollToSpec: function() {},

        jasmineStarted: function(suiteInfo) {

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

        getJasmineHTMLReporterInterface: function() {
            return {
                jasmineStarted: this.jasmineStarted.bind(this),
                suiteStarted: this.suiteStarted.bind(this),
                specStarted: this.specStarted.bind(this),
                specDone: this.specDone.bind(this),
                suiteDone: this.suiteDone.bind(this),
                jasmineDone: this.jasmineDone.bind(this)
            }
        }
    }

    Reporter.prototype.constructor = Reporter;

    KJHTML_APP.registerClass("Reporter", Reporter);
})();
