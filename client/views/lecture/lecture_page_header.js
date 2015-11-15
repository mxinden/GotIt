Template.lecturePageHeader.helpers({
  isChangingTitle: function() {
    return Session.get('landingPage.changingTitle');
  },
  isCodeVisible: function() {
    return Session.get('lecturePage.isCodeVisible');
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

Template.lecturePageHeader.rendered = function() {
  $('#hide-lecture-code').click(function() {
    $('#lecture-page-navbar-code').hide(0);
    Session.set('lecturePage.isCodeVisible', false);
    $(window).trigger('resize');
  });
};

Template.lecturePageHeaderTitleChange.rendered = function() {
  $('#title-input').focus();
  $(window).trigger('resize');
};

Template.lecturePageHeaderTitle.rendered = function() {
  $(window).trigger('resize');
};

Template.lecturePageHeaderShowCodeButton.rendered = function() {
  $('#show-lecture-code').click(function() {
    $('#lecture-page-navbar-code').show(0);
    Session.set('lecturePage.isCodeVisible', true);
    $(window).trigger('resize');
  });
};
