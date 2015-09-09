describe("landingPage", function() {

  describe("template", function() {

    beforeEach(function(done) {
      Router.go('landing_page');
      Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);


    it("is the landing_page", function() {
      expect(Router.current().route.getName()).toEqual('landing_page');
    });

    it("shows the 'Classroom Code' input field", function() {
      expect($('input#lecture-id')).toExist();
    });

    it("shows the 'Enter Class' button", function() {
      expect($('button#btn-enter-class')).toExist();
    });

    it("shows the 'Create Classroom' button", function() {
      expect($('button#createClassroom')).toExist();
    });

    describe("'Create Classroom' button", function(done) {

      var amountLecturesBefore = Lectures.find().count();

      it("routes to a lecture", function(done){
        $('#createClassroom').click();
        waitForElement('#question-text', function() {
          expect(Router.current().route.getName()).toEqual('lecturePage');
          done();
        });

      });

      it("creates an new lecture document in the lectures collection", function() {
        var amountLecturesAfter = Lectures.find().count();
        expect(amountLecturesAfter).toBeGreaterThan(amountLecturesBefore);
      });

    });

    describe("'Enter Classroom' button", function() {

      it("routes to a lecture page", function(done){
        var lectureCode = '00000';
        $('#lecture-id').val(lectureCode);
        $('#btn-enter-class').trigger("click");
        waitForElement('#question-text', function() {
          expect(Router._currentRoute.getName()).toEqual('lecturePage');
          done();
        });
      });

    });

  });

});
