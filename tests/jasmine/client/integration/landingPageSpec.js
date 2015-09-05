describe("landingPage", function(){

  describe("template", function(){

    beforeEach(function(done) {
      Router.go('landing_page');
      Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);


    it("landing_page", function(){
      expect(Router.current().route.getName()).toEqual('landing_page');
    });

    it("shows the 'Classroom Code' input field", function() {
      expect($('input#lectureID')).toExist();
    });

    it("shows the 'Enter Class' button", function(){
      expect($('button#btn-enter-class')).toExist();
    });

    it("shows the 'Create Classroom' button", function(){
      expect($('button#createClassroom')).toExist();
    });

    describe("'Create Classroom' button", function(done) {

      var amountLecturesBefore = Lectures.find().count();

      it("routes to a lecture", function(done){
        $('#createClassroom').click();
        waitForElement('#questionText', function(){
          expect(Router.current().route.getName()).toEqual('lecturePage');
          done();
        });

      });

      it("creates an new lecture document in the lectures collection", function(done) {
        var amountLecturesAfter = Lectures.find().count();
        expect(amountLecturesAfter).toBeGreaterThan(amountLecturesBefore);
        done();
      });

    });

    describe("'Enter Classroom' button", function() {

      it("routes to a lecture page", function(done){
        var lectureCode = '00000';
        $('#lectureID').val(lectureCode);
        $('#btn-enter-class').trigger("click");
        waitForElement('#questionText', function() {
          expect(Router._currentRoute.getName()).toEqual('lecturePage');
          done();
        });
      });

    });

  });

});
