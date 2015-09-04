Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading', 
  //waitOn: function() {return Meteor.subscribe('lectures');}
});

/* Route user to landing page */ 
Router.route('/', {
  name: 'landing_page'
});

/* Route user to specific lecture page */
Router.route('/lectures/:lectureCode', {
  name: 'lecturePage',
  data: function() { return Lectures.findOne({lectureCode: this.params.lectureCode});},
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
  }
});
