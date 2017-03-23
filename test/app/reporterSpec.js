describe("Reporter Spec.", function() {

    var sandbox,
        reporter,
        container,
        domUtil,
        toolbar,
        dotsSpectReporter,
        treeSpecReporter;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();

        container = {
            appendChild: sandbox.stub()
        };

        domUtil = {
            createDom: sandbox.stub().returns("domTree")
        };

        toolbar = {
            setTotalSpecsDefined: sandbox.stub(),
            getEl: sandbox.stub().returns("toolbarEl")
        };

        dotsSpectReporter = {
            getEl: sandbox.stub().returns("dotsSpectReporterEl")
        };

        treeSpecReporter = {
            getEl: sandbox.stub().returns("treeSpecReporterEl")
        };
    });

    function getReporter() {
        var Reporter = KJHTML_APP.getClass("Reporter");

        return new Reporter({
            container: container,
            domUtil: domUtil,
            toolbar: toolbar,
            dotsSpectReporter: dotsSpectReporter,
            treeSpecReporter: treeSpecReporter
        });
    }

    afterEach(function() {
        sandbox.restore();
    });

    it("should build reporter on initialize", function() {
        reporter = getReporter();

        expect(container.appendChild).toHaveBeenCalledWith("domTree");
        expect(toolbar.getEl).toHaveBeenCalled();
        expect(dotsSpectReporter.getEl).toHaveBeenCalled();
        expect(treeSpecReporter.getEl).toHaveBeenCalled();
        expect(domUtil.createDom).toHaveBeenCalledWith({
            el: "div",
            attributes: {className: "kjhtml-reporter"},
            children: ["toolbarEl", "dotsSpectReporterEl", "treeSpecReporterEl"]
        });
    });

    it("should set totalSpecsDefined into toolbar on jasmineStarted", function() {
        reporter = getReporter();

        reporter.jasmineStarted({
            totalSpecsDefined: 100
        });

        expect(toolbar.setTotalSpecsDefined).toHaveBeenCalledWith(100);
    });
});
