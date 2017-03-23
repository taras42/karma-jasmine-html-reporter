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
            getEl: sandbox.stub().returns("dotsSpectReporterEl"),
            startSpec: sandbox.stub(),
            stopSpec: sandbox.stub()
        };

        treeSpecReporter = {
            startSuite: sandbox.stub(),
            startSpec: sandbox.stub(),
            stopSpec: sandbox.stub(),
            stopSuite: sandbox.stub(),
            render: sandbox.stub(),
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

    it("should call startSuite method of treeSpecReporter on suiteStarted", function() {
        reporter = getReporter();

        reporter.suiteStarted("options");

        expect(treeSpecReporter.startSuite).toHaveBeenCalledWith("options");
    });

    describe("should call startSpec method", function() {

        beforeEach(function() {
            reporter = getReporter();
            reporter.specStarted("options");
        });

        it("of treeSpecReporter on specStarted", function() {
            expect(treeSpecReporter.startSpec).toHaveBeenCalledWith("options");
        });

        it("of treeSpecReporter on specStarted", function() {
            expect(dotsSpectReporter.startSpec).toHaveBeenCalledWith("options");
        });
    });

    describe("should call stopSpec method", function() {

        beforeEach(function() {
            reporter = getReporter();
            reporter.specDone("options");
        });

        it("of treeSpecReporter on specDone", function() {
            expect(treeSpecReporter.stopSpec).toHaveBeenCalledWith("options");
        });

        it("of treeSpecReporter on specDone", function() {
            expect(dotsSpectReporter.stopSpec).toHaveBeenCalledWith("options");
        });
    });

    it("should call stopSuite method of treeSpecReporter on suiteDone", function() {
        reporter = getReporter();

        reporter.suiteDone("options");

        expect(treeSpecReporter.stopSuite).toHaveBeenCalledWith("options");
    });

    it("should call render method of treeSpecReporter on jasmineDone", function() {
        reporter = getReporter();

        reporter.jasmineDone("options");

        expect(treeSpecReporter.render).toHaveBeenCalled();
    });
});
