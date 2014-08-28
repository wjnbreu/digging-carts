describe("Beast Spec", function() {
    describe("Starting video should be correct", function() {
        it("uses the correct Brightcove ID", function() {
            expect(playerData).toEqual(3747000906001);
        });
    });
});