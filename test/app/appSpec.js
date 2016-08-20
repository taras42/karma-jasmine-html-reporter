describe("App Spec.", function() {

    afterEach(function() {
        KJHTML_APP.reset();
    });

    it("should register class", function() {
        var customClass = function() {};

        KJHTML_APP.registerClass("myCustomClass", customClass);

        expect(KJHTML_APP.getClass("myCustomClass")).toEqual(customClass);
    });

    it("should throw error if no class with specified name was found", function() {
        expect(function() {
            KJHTML_APP.getClass("myCustomClass");
        }).toThrow(new Error("There is no class with name myCustomClass"));
    });

});
