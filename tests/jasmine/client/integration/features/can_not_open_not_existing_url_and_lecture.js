describe("Routing to a not existing url", function() {

  beforeAll(function(done) {  
    Router.go('/invalidURL');
    Tracker.afterFlush(done);
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
