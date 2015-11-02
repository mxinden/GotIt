describe("lecturePage", function() {

  var lectureCode;

  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  beforeAll(function(done) {
    Fixtures.createLecture({},function(error, result) {
      lectureCode = result;
      done()
    });
  });

  beforeAll(function(done) {
    Fixtures.createQuestion({}, done);
  });

  beforeAll(function(done) {
    Router.go('lecturePage', {lectureCode: lectureCode});
    Tracker.afterFlush(done);
  });
  beforeAll(waitForRouter);

  describe("template", function() {

    it("is a lecture page", function() {
      expect(Router.current().route.getName()).toEqual('lecturePage'); 
    });

    describe("header", function() {

      it("shows the right title", function() {
        lectureTitle = Router.current().data().title;
        expect($('#title')[0].innerHTML).toEqual(lectureTitle);
      });

      it("shows at least one present user", function() {
        /** return everything after a colon and a space */
        var reg = new RegExp(/\:\s(.*)/);
        var htmlString = $('#number-members')[0].innerHTML;
        numberMembers = reg.exec(htmlString)[1];
        expect(numberMembers).toBeGreaterThan(0);
      });

    });

    describe("footer", function() {

      it("shows the 'Your question ...' input field", function() {
        expect($('input#question-text')).toExist();
      });

      it("shows the 'Send' button", function() {
        expect($('button#create-question')).toExist();
      });

    });

  });

});
