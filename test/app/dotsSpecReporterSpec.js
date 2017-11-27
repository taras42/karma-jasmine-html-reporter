describe("DotsSpectReporter Spec.", function() {

    var sandbox,
        dotsSpectReporter,
        domUtil,
        specUtil,
        elStub,
        dotsContainerStub,
        infoContainerStub;

    beforeEach(function() {
        sandbox = sinon.sandbox.create();

        elStub = {
            appendChild: sandbox.stub()
        };

        dotsContainerStub = {
            appendChild: sandbox.stub()
        };

        infoContainerStub = {
            appendChild: sandbox.stub()
        };

        domUtil = {
            addClass: sandbox.stub(),
            createDom: sandbox.stub().returns("domTree")
        };

        specUtil = {
            isSpecHasNoExpectations: sandbox.stub()
        };

        domUtil.createDom.withArgs({
            el: "div",
            attributes: {className: "kjhtml-dots-spec-reporter-dots"},
        }).returns(dotsContainerStub);

        domUtil.createDom.withArgs({
            el: "div",
            attributes: {className: "kjhtml-dots-spec-reporter-info"},
        }).returns(infoContainerStub);

        domUtil.createDom.withArgs({
            el: "div",
            attributes: {className: "kjhtml-dots-spec-reporter"},
            children: [dotsContainerStub, infoContainerStub]
        }).returns(elStub);
    });

    function getDotsSpecReporter() {
        var DotsSpecReporter = KJHTML_APP.get("DotsSpecReporter");

        return new DotsSpecReporter({
            domUtil: domUtil,
            specUtil: specUtil
        });
    }

    afterEach(function() {
        sandbox.restore();
    });

    it("should return el on getEl", function() {
        dotsSpectReporter = getDotsSpecReporter();

        var el = dotsSpectReporter.getEl();

        expect(el).toEqual(elStub);
    });

    it("should create spec on startSpec", function() {
        dotsSpectReporter = getDotsSpecReporter();

        dotsSpectReporter.startSpec({
            id: "specId",
            fullName: "specName"
        });

        expect(domUtil.createDom).toHaveBeenCalledWith({
            el: "div",
            attributes: {
                id: "specId",
                className: "kjhtml-dots-spec-reporter-spec"
            },
            children: ["specName"]
        });

        expect(dotsSpectReporter.currentSpec).toEqual("domTree");
    });

    describe("should append spec to dotsContainer on stopSpec", function() {
        var spec = {
                status: "status"
            };

        beforeEach(function() {
            dotsSpectReporter = getDotsSpecReporter();
        });

        it("adding kjhtml-has-no-expectations class to spec", function() {
            specUtil.isSpecHasNoExpectations.returns(true);

            dotsSpectReporter.startSpec(spec);
            dotsSpectReporter.stopSpec(spec);

            expect(domUtil.addClass)
                .toHaveBeenCalledWith("domTree", "kjhtml-has-no-expectations");

            expect(specUtil.isSpecHasNoExpectations).toHaveBeenCalledWith(spec);
            expect(dotsContainerStub.appendChild).toHaveBeenCalledWith("domTree");
        });

        it("adding status as class to spec", function() {
            specUtil.isSpecHasNoExpectations.returns(false);

            dotsSpectReporter.startSpec(spec);
            dotsSpectReporter.stopSpec(spec);

            expect(domUtil.addClass)
                .toHaveBeenCalledWith("domTree", "status");

            expect(dotsContainerStub.appendChild).toHaveBeenCalledWith("domTree");
        });
    });
});
