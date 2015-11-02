describe("landingPage", function() {
  describe("template", function() {
    beforeAll(function(done) {
      Router.go('landingPage');
      Tracker.afterFlush(done);
    });

    beforeAll(waitForRouter);

    beforeAll(function(done) {
      waitForElement('#landing-page', function() {
        done();
      });
    });

    it("is the landingPage", function() {
      expect(Router.current().route.getName()).toEqual('landingPage');
    });

    it("shows the 'Classroom Code' input field", function() {
      expect($('input#lecture-code-input')).toExist();
    });

    it("shows the 'Enter Class' button", function() {
      expect($('button#btn-enter-class')).toExist();
    });

    it("shows the 'Create Classroom' button", function() {
      expect($('button#create-lecture')).toExist();
    });

  });
});
