Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading', 
  notFoundTemplate: 'notFound'
});

/* Route user to landing page */ 
Router.route('/', {
  name: 'landing_page',
  waitOn: function() {
    return [
      Meteor.subscribe('lecturesOnlyLectureCode')
    ];
  }
});

/* Route user to specific lecture page */
Router.route('/:lectureCode', {
  name: 'lecturePage',
  waitOn: function() {
    return [
      Meteor.subscribe('lecture', this.params.lectureCode),
      Meteor.subscribe('questions', this.params.lectureCode),
      Meteor.subscribe('votes', this.params.lectureCode)
    ];
  },
  onBeforeAction: function() {
    Meteor.call('memberInsert', this.params.lectureCode);
    this.next();
  },
  data: function() { return Lectures.findOne({lectureCode: this.params.lectureCode});}
});

/** Route to notFound template if lecture with this lecture code does not exist*/
Router.onBeforeAction('dataNotFound', {only: 'lecturePage'});
