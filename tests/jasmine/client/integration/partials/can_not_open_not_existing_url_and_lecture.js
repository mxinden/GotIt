describe("Routing to a not existing url", function() {

  beforeAll(function() {  
    Router.go('/invalidURL');
  });

  beforeAll(function(done) {
    waitForElement('div#not-found-template', function() {
      done();
    });
  });

  it("routes to the notFound template", function() {
    expect($('div#not-found-template')).toExist();
  });

});

describe("Routing to a not existing lecture", function() {
  beforeAll(function(done) {
    Router.go('lecturePage', {lectureCode: 'invalidLectureCode'});
    Tracker.afterFlush(done);
  });
  beforeAll(waitForRouter);

  it("routes to the notFound template", function() {
    expect($('div#not-found-template')).toExist();
  });
});

describe("notFound template", function() {
  describe("link to landing page", function() {
    beforeAll(function(done) {
      Router.go('lecturePage', {lectureCode: 'invalidLectureCode'});
      Tracker.afterFlush(done);
    });
    beforeAll(waitForRouter);

    beforeAll(function(done) {
      $('a').click();
      waitForElement('#landing-page', function() {
        done();
      });
    });

    it("links back to the landing page", function() {
      expect($('#landing-page')).toExist();
    });
  });
});
