Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading', 
  //waitOn: function() {return Meteor.subscribe('lectures');}
});

/* Route user to landing page */ 
Router.route('/', {
  name: 'landing_page'
});
