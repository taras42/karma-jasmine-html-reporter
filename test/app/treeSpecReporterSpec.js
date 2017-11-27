describe("TreeSpecReporter Spec.", function() {

    var sandbox,
        treeSpecReporter,
        domUtil,
        specUtil,
        elStub,
        suiteContainerStub;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();

        elStub = {
            appendChild: sandbox.stub()
        };

        suiteContainerStub = {
            appendChild: sandbox.stub()
        };

        domUtil = {
            createDom: sandbox.stub().returns("domTree")
        };

        specUtil = {
            isSpecPassed: sandbox.stub(),
            isSpecDisabled: sandbox.stub(),
            isSpecPending: sandbox.stub(),
            isSpecFailed: sandbox.stub(),
            isSpecHasNoExpectations: sandbox.stub(),
            getSuiteId: sandbox.stub().returns("suiteId"),
            getSpecId: sandbox.stub().returns("specId")
        };

        domUtil.createDom.withArgs({
            el: "div",
            attributes: {className: "kjhtml-tree-spec-reporter-suite-container"}
        }).returns(suiteContainerStub);

        domUtil.createDom.withArgs({
            el: "div",
            attributes: {className: "kjhtml-tree-spec-reporter"}
        }).returns(elStub);
    });

    function getTreeSpecReporter() {
        var TreeSpecReporter = KJHTML_APP.get("TreeSpecReporter");

        return new TreeSpecReporter({
            domUtil: domUtil,
            specUtil: specUtil
        });
    }

    afterEach(function() {
        sandbox.restore();
    });

    it("should return el on getEl", function() {
        treeSpecReporter = getTreeSpecReporter();

        var el = treeSpecReporter.getEl();

        expect(el).toEqual(elStub);
    });

    it("should append suiteContainer to el on render", function() {
        treeSpecReporter = getTreeSpecReporter();

        treeSpecReporter.render();

        expect(elStub.appendChild).toHaveBeenCalledWith(suiteContainerStub);
    });

    describe("on startSuite", function() {

        it("should create suite element", function() {
            treeSpecReporter = getTreeSpecReporter();

            treeSpecReporter.startSuite({description: "description"});

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "p",
                attributes: {className: "kjhtml-tree-spec-reporter-suite-descr"},
                children: ["description"]
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "div",
                attributes: {
                    id: "suiteId",
                    className: "kjhtml-tree-spec-reporter-suite"
                },
                children: ["domTree"]
            });

            expect(suiteContainerStub.appendChild).toHaveBeenCalledWith("domTree");
        });

        it("should not create suite element if it is already created", function() {
            treeSpecReporter = getTreeSpecReporter();

            treeSpecReporter.currentSuite = {name: "currentSuite"};

            treeSpecReporter.startSuite({description: "description"});

            expect(domUtil.createDom).not.toHaveBeenCalledWith({
                el: "p",
                attributes: {className: "kjhtml-tree-spec-reporter-suite-descr"},
                children: ["description"]
            });
        });
    });

    describe("on stopSuite", function() {

        it("should set currentSuite to currentSuite.parent if it is not equal to suiteContainer", function() {
            treeSpecReporter = getTreeSpecReporter();

            treeSpecReporter.currentSuite = {
                parent: "currentSuiteParent"
            };

            treeSpecReporter.stopSuite();

            expect(treeSpecReporter.currentSuite).toEqual("currentSuiteParent");
        });

        it("should set currentSuite to null if currentSuite.parent equals to suiteContainer", function() {
            treeSpecReporter = getTreeSpecReporter();

            treeSpecReporter.currentSuite = {
                parent: suiteContainerStub
            };

            treeSpecReporter.stopSuite();

            expect(treeSpecReporter.currentSuite).toEqual(null);
        });
    });

    describe("on stopSpec", function() {
        var currentSuite;

        beforeEach(function() {
            currentSuite = {
                appendChild: sandbox.stub()
            };

            treeSpecReporter = getTreeSpecReporter();

            treeSpecReporter.currentSuite = currentSuite;
        });

        it("should create succesful spec with expectations el", function() {
            treeSpecReporter.stopSpec({
                status: "status",
                fullName: "specFullName"
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "p",
                attributes: {
                    className: "kjhtml-tree-spec-reporter-spec-name"
                },
                children: ["specFullName"]
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "div",
                attributes: {
                    id: "specId",
                    className: "kjhtml-tree-spec-reporter-spec status"
                },
                children: ["domTree"]
            });
        });

        it("should create succesful spec without expectations el", function() {
            specUtil.isSpecHasNoExpectations.withArgs("status").returns(true);

            treeSpecReporter.stopSpec({
                status: "status",
                fullName: "specFullName"
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "p",
                attributes: {
                    className: "kjhtml-tree-spec-reporter-spec-name"
                },
                children: ["specFullName"]
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "div",
                attributes: {
                    id: "specId",
                    className: "kjhtml-tree-spec-reporter-spec has-no-expectations"
                },
                children: ["domTree"]
            });
        });

        it("should create failed spec el", function() {
            specUtil.isSpecFailed.withArgs("status").returns(true);

            treeSpecReporter.stopSpec({
                status: "status",
                fullName: "specFullName",
                failedExpectations: [
                    {
                        message: "expectation0Message",
                        stack: "expectation0Stack"
                    },
                    {
                        message: "expectation1Message",
                        stack: "expectation1Stack"
                    }
                ]
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "p",
                attributes: {
                    className: "kjhtml-tree-spec-reporter-spec-name"
                },
                children: ["specFullName"]
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "div",
                attributes: {className: "kjhtml-tree-spec-reporter-spec-failed-expectation-message"},
                children: ["expectation0Message"]
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "div",
                attributes: {className: "kjhtml-tree-spec-reporter-spec-failed-expectation-stack"},
                children: ["expectation0Stack"]
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "div",
                attributes: {className: "kjhtml-tree-spec-reporter-spec-failed-expectation-message"},
                children: ["expectation1Message"]
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "div",
                attributes: {className: "kjhtml-tree-spec-reporter-spec-failed-expectation-stack"},
                children: ["expectation1Stack"]
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "div",
                attributes: {className: "kjhtml-tree-spec-reporter-spec-failed-expectation"},
                children: ["domTree", "domTree"]
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "div",
                attributes: {className: "kjhtml-tree-spec-reporter-spec-failed-expectations"},
                children: ["domTree", "domTree"]
            });

            expect(domUtil.createDom).toHaveBeenCalledWith({
                el: "div",
                attributes: {
                    id: "specId",
                    className: "kjhtml-tree-spec-reporter-spec status"
                },
                children: ["domTree"]
            });
        });
    });
});
