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

      beforeAll(function(done) {
        var interval = setInterval(function() {
          if($('#title').length) {
            clearInterval(interval);
            done();
          }
        },100);
      });

      it("shows the right title", function() {
        lectureTitle = Router.current().data().title;
        expect($('#title')[0].innerHTML).toEqual(lectureTitle);
      });

      it("shows one present user", function() {
        var numberOfMembers = $('#number-of-members').text();
        expect(numberOfMembers).toEqual('1 member');
      });

    });

    describe("footer", function() {

      it("shows the 'Your question ...' input field", function() {
        expect($('input#question-text')).toExist();
      });

      it("shows the 'Send' button", function() {
        expect($('button#btn-create-question')).toExist();
      });

    });

  });

});
