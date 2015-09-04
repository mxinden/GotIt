describe("landingPage", function(){

  describe("template", function(){

    beforeAll(function(done) {
      Router.go('landing_page');
      Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);

    it("shows the 'Classroom Code' input field", function() {
      expect($('input#lectureID')).toExist();
    });

    it("shows the 'Enter Class' button", function(){
      expect($('button#btn-enter-class')).toExist();
    });

    it("shows the 'Create Classroom' button", function(){
      expect($('button#createClassroom')).toExist();
    });

    describe("'Create Classroom' button on the landing page", function() {

      var amountLecturesBefore = Lectures.find().count();

      it("routes to a new lecture", function(done){
        $('#createClassroom').trigger("click");
        done();
        expect(Router._currentRoute.getName()).toEqual('lecturePage');
      });

      it("creates an new lecture document in the lectures collection", function() {
        var amountLecturesAfter = Lectures.find().count();
        expect(amountLecturesAfter).toBeGreaterThan(amountLecturesBefore);
      });

    });

  });

});
