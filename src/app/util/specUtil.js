(function(KJHTML_APP) {

    var statusEnum = KJHTML_APP.get("statusEnum");

    var specUtil = {

        getSuiteId: function() {
            return "suite" + Date.now();
        },

        getSpecId: function() {
            return "spec" + Date.now();
        },

        isSpecPassed: function(spec) {
            return spec.status === statusEnum.PASSED;
        },

        isSpecFailed: function(spec) {
            return spec.status === statusEnum.FAILED;
        },

        isSpecDisabled: function(spec) {
            return spec.status === statusEnum.DISABLED;
        },

        isSpecPending: function(spec) {
            return spec.status === statusEnum.PENDING;
        },

        isSpecHasNoExpectations: function(spec) {
            var failedExpectations = spec.failedExpectations,
                passedExpectations = spec.passedExpectations;

            return (failedExpectations.length === 0)
                && (passedExpectations.length === 0);
        }
    };

    KJHTML_APP.register("specUtil", specUtil);
})(KJHTML_APP);
