describe("landingPage", function() {

  describe("template", function() {

    beforeEach(function(done) {
      Router.go('landingPage');
      Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);


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

    describe("'Create Classroom' button", function(done) {

      var amountLecturesBefore = Lectures.find().count();

      it("routes to a lecture", function(done){
        $('#create-lecture').click();
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
        $('#lecture-code-input').val(lectureCode);
        $('#btn-enter-class').trigger("click");
        waitForElement('#question-text', function() {
          expect(Router._currentRoute.getName()).toEqual('lecturePage');
          done();
        });
      });

    });

  });

});
