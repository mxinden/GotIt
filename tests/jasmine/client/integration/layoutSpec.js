describe("landingPage", function(){
  describe("template", function(){
    it("shows the 'create classroom' button", function(){
      expect($('button#createClassroom')).toExist();
    });
  });
});
