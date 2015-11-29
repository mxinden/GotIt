"use strict";

describe("landingPage", function() {
  describe("template", function() {
    beforeAll(function(done) {
      Fixtures.clearDB(done);
    });

    beforeAll(function(done) {
      Router.go('landingPage');
      Tracker.afterFlush(done);
    });

    beforeAll(waitForRouter);

    beforeAll(function(done) {
      waitForElement('#landing-page', done);
    });

    it("is the landingPage", function() {
      expect(Router.current().route.getName()).toEqual('landingPage');
    });

    it("shows the 'Lecture Code' input field", function() {
      expect($('input#lecture-code-input')).toExist();
    });

    it("shows the 'Enter Lecture' button", function() {
      expect($('button#btn-enter-lecture')).toExist();
    });

    it("shows the 'Create Lecture' button", function() {
      expect($('button#create-lecture')).toExist();
    });
  });
});
