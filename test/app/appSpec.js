describe("App Spec.", function() {

    afterEach(function() {
        KJHTML_APP.unregister("myCustomModule");
    });

    it("should register module", function() {
        var customModule = function() {};

        KJHTML_APP.register("myCustomModule", customModule);

        expect(KJHTML_APP.get("myCustomModule")).toEqual(customModule);
    });

    it("should throw error if no module with specified name was found", function() {
        expect(function() {
            KJHTML_APP.get("myCustomModule");
        }).toThrow(new Error("There is no module with name myCustomModule"));
    });

});
