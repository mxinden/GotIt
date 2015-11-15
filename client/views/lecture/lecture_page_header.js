Template.lecturePageHeader.helpers({
  isChangingTitle: function() {
    return Session.get('landingPage.changingTitle');
  },
  isLectureCodeVisible: function() {
    return Session.get('lecturePage.isLectureCodeVisible');
  }
});

Template.lecturePageHeader.events({
  //Handle Click event
  'click #title': function(e) {
    if (this.author == Meteor.userId()) {
      Session.set('landingPage.changingTitle', true);
    }
  },
  //Handle the <RETURN> key event
  'keypress #title-input': function(e) {
    if (e.which == 13) {
      Meteor.call('setTitle', this.lectureCode, $('#title-input').val());
      Session.set('landingPage.changingTitle', false);
    }
  },
  'blur #title-input': function() {
    Meteor.call('setTitleOfLecture', this.lectureCode, $('#title-input').val());
    Session.set('landingPage.changingTitle', false);
  },
  'click #back-button': function() {
    leaveLecture(); //see lecture_page.js
  },
  'click #show-lecture-code': function() {
    Session.set('lecturePage.isLectureCodeVisible', true);
    Tracker.afterFlush(function() {
      $(window).trigger('resize');
    });
  },
  'click #hide-lecture-code': function() {
    Session.set('lecturePage.isLectureCodeVisible', false);
    $(window).trigger('resize');
  }
});

Template.lecturePageHeaderTitle.helpers({
  isAuthor: function() {
    return (this.author == Meteor.userId());
  },
  numberOfMembers: function() {
    var number = getNumberOfMembersInLecture(this.lectureCode);
    var result = number + ' member';

    if (number > 1) {
      result += 's';
    }

    return result;
  }
});

Template.lecturePageHeaderTitleChange.rendered = function() {
  $('#title-input').focus();
  $(window).trigger('resize');
};

Template.lecturePageHeaderTitle.rendered = function() {
  $(window).trigger('resize');
};
